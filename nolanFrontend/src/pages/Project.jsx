/** @format */

function Project() {
	return (
		<div className='w-full flex flex-col items-center justify-center'>
			<div className='card mt-10'>
				<div className='card-body text-black'>
					<h1 className='text-2xl font-bold'>Untitled Projects</h1>
					<h3 className='text-lg font-semibold'>Feature</h3>
					<p className='text-gray-600'>Description</p>
				</div>
			</div>
			<button className='bg-blue-500 text-white flex items-center gap-2 py-2 px-4 rounded mt-4'>
				<i className='ki-outline ki-plus-squared'></i>
				Write Script
			</button>
		</div>
	);
}

export default Project;
