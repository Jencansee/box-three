import { A11y } from '@react-three/a11y';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { Material, Mesh, Object3D } from 'three';
import lerp from '@/utils/lerp';

type GLTFResult = GLTF & {
	nodes: {
		[key: string]: Mesh;
	};
};

const BoxComponent = () => {
	//#region states & refs
	const [open, setOpen] = useState(false);
	const lidRef = useRef<Object3D>();
	const hingeRef = useRef<Object3D>();
	//#endregion

	const boxModel = useGLTF('./box.glb') as GLTFResult;

	//? select nodes
	const node = boxModel.scene.getObjectByName('BOX1');
	const lidNode = node.getObjectByName('lid');
	const hingeNode = node.getObjectByName('hinge');

	//? attach nodes to refs
	lidRef.current = lidNode;
	hingeRef.current = hingeNode;

	//* animation
	useFrame(() => {
		if (open) {
			//@ts-ignore
			lidRef.current.material.transparent = false;

			lidRef.current.rotation.x = lerp(
				lidRef.current.rotation.x,
				-Math.PI / 3,
				0.1
			);
			hingeRef.current.rotation.x = lerp(
				hingeRef.current.rotation.x,
				-Math.PI / 3.5,
				0.1
			);
		} else {
			//! change this to apply transparency
			//@ts-ignore
			lidRef.current.material.opacity = 0.3;
			//@ts-ignore
			lidRef.current.material.transparent = true;

			lidRef.current.rotation.x = lerp(lidRef.current.rotation.x, 0, 0.1);
			hingeRef.current.rotation.x = lerp(
				hingeRef.current.rotation.x,
				0,
				0.1
			);
		}
	});

	return (
		<>
			<A11y
				role="button"
				description={`Click to ${open ? 'close' : 'open'} the lid`}
				actionCall={() => setOpen(!open)}
			>
				<primitive object={boxModel.scene} />
			</A11y>
			<directionalLight position={[5, 5, 5]} />
			<ambientLight />
		</>
	);
};
export default BoxComponent;
