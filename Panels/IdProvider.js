import hoc from '@enact/core/hoc';
import {Component} from 'react';

let GlobalId = 0;

const ID_KEY = '$$ID$$';

/**
 * Default config for {@link agate/Panels.IdProvider}
 *
 * @hocconfig
 * @memberof agate/Panels.IdProvider
 */
const defaultConfig = {
	/**
	 * Prop to pass the identifier generation function
	 *
	 * @type {String}
	 * @default generateId
	 * @memberof agate/Panels.IdProvider.defaultConfig
	 */
	generateProp: 'generateId',

	/**
	 * Prop to pass the identifier
	 *
	 * @type {String}
	 * @default id
	 * @memberof agate/Panels.IdProvider.defaultConfig
	 */
	idProp: 'id',

	/**
	 * Optional prefix for the identifier
	 *
	 * @type {String}
	 * @default 'c_'
	 * @memberof agate/Panels.IdProvider.defaultConfig
	 */
	prefix: 'c_'
};

/**
 * A higher-order component that generates globally-unique identifiers
 *
 * @class IdProvider
 * @hoc
 * @memberof agate/Panels
 * @private
 */
const IdProvider = hoc(defaultConfig, (config, Wrapped) => {
	const {generateProp, idProp, prefix} = config;

	return class extends Component {
		static displayName = 'IdProvider';

		constructor () {
			super();

			this.ids = {};
		}

		componentWillUnmount () {
			// Call the onUnmount handler for each generated id (note: not the key)
			for (const key in this.ids) {
				const {id, onUnmount} = this.ids[key];
				if (typeof onUnmount === 'function') {
					onUnmount(id);
				}
			}
		}

		generateId = (key, idPrefix = prefix, onUnmount) => {
			// if an id has been generated for the key, return it
			if (key in this.ids) {
				return this.ids[key].id;
			}

			// otherwise generate a new id (with an optional prefix), cache it, and return it
			const id = `${idPrefix}${++GlobalId}`;
			this.ids[typeof key === 'undefined' ? `generated-${id}` : key] = {
				id,
				onUnmount
			};

			return id;
		};

		render () {
			const props = Object.assign({}, this.props);

			if (generateProp) {
				props[generateProp] = this.generateId;
			}

			if (idProp && !props[idProp]) {
				props[idProp] = this.generateId(ID_KEY);
			}

			return (
				<Wrapped {...props} />
			);
		}
	};
});

export default IdProvider;
export {
	IdProvider
};
