import styled from 'styled-components';
import { useState } from 'react';
import PropTypes from 'prop-types';

const PlaceholderContainer = styled.div`
	width: 1044px;
	height: 240px;
	min-height: 96px;
	border-radius: 12px;
	border-width: 1px;
	border-style: solid;
	border-color: var(--Colors-GrayScale-G200, rgba(243, 245, 248, 1));
	background: var(--Colors-GrayScale-G100, rgba(248, 249, 252, 1));
	box-shadow: 0px 0px 8px 0px rgba(26, 26, 35, 0.12) inset;
	display: flex;
	flex-direction: column;
	padding: 16px;
	cursor: pointer;
`;

const TitleInput = styled.input`
	width: 100%;
	height: 24px;
	font-family: 'SUIT Variable';
	font-weight: 600;
	font-size: 20px;
	line-height: 28px;
	letter-spacing: -2.5%;
	color: var(--Colors-GrayScale-G500, rgba(79, 84, 98, 1));
	background: var(--Colors-GrayScale-G100, rgba(248, 249, 252, 1));
	border: none;
	outline: none;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	&::placeholder {
		color: var(--Colors-GrayScale-G400, rgba(148, 155, 173, 1));
		font-weight: 600;
		font-size: 20px;
		line-height: 28px;
		letter-spacing: -0.5px;
		font-family: 'SUIT Variable';
	}
`;

const BodyContainer = styled.div`
	position: relative;
	flex: 1;
	display: flex;
	flex-direction: column;
`;

const BodyInput = styled.textarea`
	width: 100%;
	height: calc(100% - 20px);
	min-height: unset;
	font-family: 'SUIT Variable';
	font-weight: 600;
	font-size: 16px;
	line-height: 24px;
	letter-spacing: -2.5%;
	color: var(--Colors-GrayScale-G500, rgba(79, 84, 98, 1));
	background: var(--Colors-GrayScale-G100, rgba(248, 249, 252, 1));
	border: none;
	outline: none;
	resize: none;
	overflow-y: auto;

	&::placeholder {
		color: var(--Colors-GrayScale-G400, rgba(148, 155, 173, 1));
		font-weight: 600;
		font-size: 16px;
		line-height: 24px;
		letter-spacing: -0.4px;
		font-family: 'SUIT Variable';
	}
`;

const Divider = styled.div`
	width: 100%;
	height: 0;
	margin: 15px 0;
	border: 1px solid var(--Colors-GrayScale-G300, rgba(229, 234, 242, 1));
`;

const CharacterCount = styled.div`
	position: absolute;
	bottom: 0;
	right: 0;
	color: var(--Colors-GrayScale-G400, rgba(148, 155, 173, 1));
	font-family: 'SUIT Variable';
	font-size: 12px;
	font-weight: 500;
	line-height: 15.84px;
	letter-spacing: -0.3px;
`;



const RegisterPlaceholder = ({ maxLength }) => {
	const [bodyText, setBodyText] = useState('');

	const handleBodyChange = (e) => {
		setBodyText(e.target.value);
	};

	return (
		<PlaceholderContainer>
			<div>
				<TitleInput placeholder="제목 입력" />
			</div>
			<Divider />
			<BodyContainer>
				<BodyInput 
					placeholder="소개글 입력" 
					value={bodyText}
					onChange={handleBodyChange}
					maxLength={maxLength}
				/>
				<CharacterCount>
					({bodyText.length} / {maxLength})
				</CharacterCount>
			</BodyContainer>
		</PlaceholderContainer>
	);
};

RegisterPlaceholder.propTypes = {
	maxLength: PropTypes.number.isRequired
};

export default RegisterPlaceholder;
