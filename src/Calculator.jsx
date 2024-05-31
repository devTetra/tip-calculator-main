import React, { useEffect, useState } from 'react';

import dollarIcon from './assets/img/icon-dollar.svg';
import personIcon from './assets/img/icon-person.svg';

const Calculator = () => {
	const [disabled, setDisabled] = useState('disabled');
	const [selected, setSelected] = useState(null);
	const [tipAmount, setAmount] = useState('0.00');
	const [totalAmount, setTotal] = useState('0.00');
	const [val, setVal] = useState({
		bill: null,
		tips: null,
		person: null,
	});
	const [errors, setErrors] = useState({
		bill: false,
		tips: false,
		person: false,
	});
	const btns = [5, 10, 15, 25, 50];

	// Handler Functions

	const handleValidation = e => {
		const value = e.target.value === '' ? '' : Number(e.target.value);
		const name = e.target.name;
		if (value > 0) {
			setVal({ ...val, [name]: value });
			setErrors({ ...errors, [name]: false });
			setDisabled('');
		} else {
			setErrors({ ...errors, [name]: true });
		}
	};

	const handleTips = tips => {
		setVal({ ...val, tips: tips });
		setDisabled('');
		if (selected === tips) setSelected(null);
		else setSelected(tips);
	};

	const HandleReset = event => {
		setSelected('');
		setDisabled('disabled');
		setAmount('0.00');
		setTotal('0.00');
	};

	const changeTip = e => {
		setSelected(null);
		setVal({ ...val, tips: e.target.value });
	};

	const calcTip = () => {
		if (val.bill && val.tips && val.person) {
			const final = (val.bill * val.tips) / (val.person * 100);
			const total = val.bill / val.person + final;
			setAmount(`${final.toFixed(2)}`);
			setTotal(`${total.toFixed(2)}`);
		}
	};

	useEffect(() => calcTip(), [val.bill, val.tips, val.person]);

	return (
		<section>
			<form
				action=''
				className='calculator container flex-md-row rounded-4 py-4 px-4 '
			>
				<section className='px-2'>
					<label htmlFor='bill' className='form-label w-100 mb-4'>
						<div className='d-flex justify-content-between align-items-center'>
							<p className='label-heading'>Bill</p>
							{errors.bill && <p className='text-danger m-0'>Can't be zero</p>}
						</div>
						<img src={dollarIcon} alt='' className='fixed-text' />
						<input
							type='number'
							className={`form-control ${errors.bill ? 'border-danger' : ''}`}
							name='bill'
							id='bill'
							aria-describedby='helpId'
							placeholder='0'
							onChange={handleValidation}
						/>
					</label>
					<div className=' tip-options mb-4'>
						<div className='d-flex justify-content-between align-items-center'>
							<p className='label-heading'>Select Tip %</p>
							{errors.tips && <p className='text-danger m-0'>Can't be zero</p>}
						</div>
						<div className='button-group'>
							{btns.map(btn => (
								<input
									type='button'
									key={btn}
									value={`${btn}%`}
									onClick={() => handleTips(btn)}
									className={`tip-btn ${selected === btn ? 'selected' : ''}`}
								/>
							))}

							<input
								type='number'
								className={`form-control ${errors.tips ? 'border-danger' : ''}`}
								name='tips'
								id=''
								placeholder='Custom'
								onChange={handleValidation}
								onClick={changeTip}
							/>
						</div>
					</div>
					<label htmlFor='person' className='form-label w-100 mb-4'>
						<div className='d-flex justify-content-between align-items-center'>
							<p className='label-heading'>Number of People</p>
							{errors.person && (
								<p className='text-danger m-0'>Can't be zero</p>
							)}
						</div>
						<img src={personIcon} alt='' className='fixed-text' />
						<input
							type='number'
							className={`form-control ${errors.person ? 'border-danger' : ''}`}
							name='person'
							id='person'
							aria-describedby='helpId'
							placeholder='0'
							onChange={handleValidation}
						/>
					</label>
				</section>
				<section className='tips-container rounded-4 p-4 gap-3'>
					<div className='tips'>
						<p>
							Tip Amount <br /> <span> / person</span>
						</p>
						<p className='amounts' id='tipAmount'>
							{`$${tipAmount}`}
						</p>
					</div>
					<div className='tips'>
						<p>
							Total <br /> <span> / person</span>
						</p>
						<p className='amounts' id='totalAmount'>
							{`$${totalAmount}`}
						</p>
					</div>
					<button
						type='reset'
						className={`btn ${disabled}`}
						onClick={HandleReset}
					>
						RESET
					</button>
				</section>
			</form>
		</section>
	);
};

export default Calculator;
