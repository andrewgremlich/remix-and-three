export const Lighting = () => {
	return (
		<>
			<ambientLight intensity={Math.PI} />
			<spotLight
				position={[10, 10, 10]}
				angle={0.15}
				penumbra={1}
				decay={0}
				intensity={Math.PI}
			/>
			<pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
		</>
	);
};
