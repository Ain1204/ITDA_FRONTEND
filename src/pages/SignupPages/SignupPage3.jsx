import styled from 'styled-components';


const SignupPage3 = ({ setStep }) => {
	return (
		<div>
			<form>
				<div>
					<label htmlFor="name">이름</label>
					<input type="text" id="name" placeholder="이름을 입력하세요" />
				</div>
				
				<div>
					<label htmlFor="ssn">주민등록번호</label>
					<div>
						<input type="text" id="ssn1" maxLength="6" placeholder="앞 6자리" /> -
						<input type="password" id="ssn2" maxLength="7" placeholder="뒤 7자리" />
					</div>
				</div>

				<div>
					<label>통신사</label>
					<select>
						<option value="">통신사 선택</option>
						<option value="SKT">SKT</option>
						<option value="KT">KT</option>
						<option value="LGU+">LGU+</option>
						<option value="알뜰폰">알뜰폰</option>
					</select>
				</div>

				<div>
					<label htmlFor="phone">휴대폰 번호</label>
					<input type="tel" id="phone" placeholder="'-' 없이 입력하세요" maxLength="11" />
				</div>
			</form>
			<button onClick={() => setStep(4)}>
				인증하기
			</button>
		</div>
	);
};

export default SignupPage3;
