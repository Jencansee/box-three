import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { A11yAnnouncer } from '@react-three/a11y';
import { OrbitControls, Preload, Stats } from '@react-three/drei';

const Controls = () => {
	const control = useRef(null);
	return <OrbitControls ref={control} />;
};
const CanvasWrapper = ({ children }) => {
	return (
		<>
			<Canvas
				// Is this deprecated or typed wrong? Ignoring for now.
				// @ts-ignore
				mode="concurrent"
				camera={{
					position: [-8, 7, 10],
					fov: 50,
				}}
				style={{
					background: 'hsl(0, 0%, 20%)',
					position: 'absolute',
					top: 0,
					left: 0,
					height: '100%',
				}}
			>
				<Stats />
				<Controls />
				<Preload all />
				{children}
			</Canvas>
			<A11yAnnouncer />
		</>
	);
};

export default CanvasWrapper;
