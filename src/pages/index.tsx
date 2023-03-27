import dynamic from 'next/dynamic';
const Box = dynamic(() => import('@/components/canvas/Box'), {
	ssr: false,
});

const DOM = () => {
	return (
		<div
			style={{
				display: 'flex',
				alignContent: 'center',
				justifyContent: 'center',
				color: '#f0f0f0',
				width: '100vw',
				fontFamily: 'Ubuntu, sans',
			}}
		>
			<h1>Click to toggle between states</h1>
		</div>
	);
};

// Canvas/R3F components here
const R3F = () => {
	return (
		<>
			<gridHelper />
			{/* <axesHelper args={[5]} position={[0, 2, 0]} /> */}
			<Box />
		</>
	);
};

export default function Page() {
	return (
		<>
			<DOM />
			<R3F />
		</>
	);
}

export async function getStaticProps() {
	return {
		props: {
			title: 'Box test',
		},
	};
}
