import Calculator from './Calculator';
import logo from './assets/img/logo.svg';
function App() {
	return (
		<>
			<main className='d-flex flex-column justify-content-center align-items-center'>
				<section>
					<div className='p-5'>
						<img src={logo} alt='Testing Logo' />
					</div>
				</section>
				<Calculator />
			</main>
		</>
	);
}

export default App;
