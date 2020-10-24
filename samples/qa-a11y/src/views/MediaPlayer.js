import MediaPlayer from '@enact/agate/MediaPlayer';
import React from 'react';

import Section from '../components/Section';

import appCss from '../App/App.module.less';

const audioFiles = [
	'https://sampleswap.org/mp3/artist/254731/BossPlayer_Your-Right-Here-160.mp3',
	'https://sampleswap.org/mp3/artist/78152/HiatusManJBanner_Show-Stopper-160.mp3',
	'https://sampleswap.org/mp3/artist/47067/DJ-Masque_Oceanic-Dawn-160.mp3',
	'https://sampleswap.org/mp3/artist/26546/benzoul_lovevoodoo-160.mp3',
	'https://sampleswap.org/mp3/artist/19139/MarkNine_In-my-Place-160.mp3',
	'https://sampleswap.org/mp3/artist/47067/DJ-Masque_Dont-Forget-To-Be-Yourself-160.mp3'
];

const source = audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />));

const MediaPlayerView = () => (
	<>
		<Section title="Default">
			<MediaPlayer alt="Normal">
				{source}
			</MediaPlayer>
			<MediaPlayer alt="Disabled" disabled>
				{source}
			</MediaPlayer>
		</Section>

		<Section className={appCss.marginTop} title="Aria-labelled">
			<MediaPlayer alt="Aria-labelled" aria-label="This is a Label.">
				{source}
			</MediaPlayer>
			<MediaPlayer alt="Aria-labelled and Disabled" aria-label="This is a Label." disabled>
				{source}
			</MediaPlayer>
		</Section>
	</>
);

export default MediaPlayerView;
