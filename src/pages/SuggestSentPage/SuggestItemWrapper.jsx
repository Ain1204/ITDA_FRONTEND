import styled from "styled-components";
import { useState } from "react";
import BrandIcon from "../../assets/SuggestsentIcon/amore-logo.svg";
import PropTypes from "prop-types"; // 맨 위에 추가

const SuggestItemWrapper = ({
  brand,
  product,
  date,
  onDelete,
  onCheck,
  checked,
}) => {
  const [hovered, setHovered] = useState(false); // 이건 hover용으로 OK

  return (
    <ItemWrapper
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <SuggestItemContainer className="suggest" isChecked={checked}>
        <CheckboxWrapper>
          <HiddenCheckbox
            type="checkbox"
            checked={checked}
            onChange={onCheck}
          />
          <StyledCheckbox checked={checked} />
        </CheckboxWrapper>

        <Image src={BrandIcon} alt="brand" />
        <Content>
          <Brand>{brand}</Brand>
          <Product>{product}</Product>
          <Tags>
            <Tag>단기 프로젝트</Tag>
            <Tag>키워드</Tag>
            <Tag>카테고리</Tag>
          </Tags>
        </Content>
        <Date>{date}</Date>
      </SuggestItemContainer>

      <DeleteArea className="delete">
        <DeleteButton onClick={onDelete}>삭제</DeleteButton>
      </DeleteArea>
    </ItemWrapper>
  );
};

SuggestItemWrapper.propTypes = {
  brand: PropTypes.string.isRequired,
  product: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default SuggestItemWrapper;

const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  width: 1.25rem;
  height: 1.25rem;
`;

const HiddenCheckbox = styled.input`
  display: none;
`;

const StyledCheckbox = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 0.25rem;
  border: 0.125rem solid ${({ checked }) => (checked ? "#248eff" : "#ccc")};
  background-color: ${({ checked }) => (checked ? "#248eff" : "#fff")};
  position: relative;

  &::after {
    content: "";
    display: ${({ checked }) => (checked ? "block" : "none")};
    position: absolute;
    left: 0.25rem;
    top: 0.03125rem;
    width: 0.25rem;
    height: 0.5rem;
    border: solid white;
    border-width: 0 0.125rem 0.125rem 0;
    transform: rotate(45deg);
  }
`;

const Image = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 1rem;
`;

const Content = styled.div`
  flex: 1;
`;

const Brand = styled.div`
  font-weight: bold;
  font-size: 0.875rem;
  color: #333;
`;

const Product = styled.div`
  font-size: 0.8125rem;
  color: #555;
  margin-top: 0.25rem;
`;

const Tags = styled.div`
  margin-top: 0.5rem;
  display: flex;
  gap: 0.5rem;
`;

const Tag = styled.span`
  background-color: #e0f0ff;
  color: #007bff;
  padding: 0.25rem 0.5rem;
  border-radius: 0.75rem;
  font-size: 0.75rem;
`;

const Date = styled.div`
  font-size: 0.75rem;
  color: #888;
  white-space: nowrap;
  margin-left: 1rem;
  align-self: flex-start;
`;

const ItemWrapper = styled.div`
  display: flex;
  min-width: 69rem;
  width: 100%;
  transition: all 0.3s ease;
  height: 6.13rem;

  &:hover .suggest {
    width: 62.25rem;
  }

  &:hover .delete {
    width: 6.75rem;
  }

  &:hover .delete button {
    transform: translateX(0);
    opacity: 1;
  }
`;

const SuggestItemContainer = styled.div.attrs({ className: "suggest" })`
  width: 100%;
  transition: width 0.3s ease;
  display: flex;
  align-items: center;
  padding: 2rem;

  background-color: ${({ isChecked }) => (isChecked ? "#e9f2ff" : "#FCFCFF")};
  border: ${({ isChecked }) =>
    isChecked ? "0.0625rem solid #248eff" : "0.0625rem solid #e5eaf2"};
  border-radius: var(--Shapes-Border-Hard, 0.5rem);
`;

const DeleteArea = styled.div.attrs({ className: "delete" })`
  width: 0;
  overflow: hidden;
  transition: width 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DeleteButton = styled.button`
  transform: translateX(100%);
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
  color: #ff5c5c;
  cursor: pointer;
  font-size: 0.875rem;
  display: flex;
  width: 6.25rem;
  padding: 0.25rem 0.5rem;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  flex-shrink: 0;
  align-self: stretch;
  border-radius: 0.125rem var(--Shapes-Border-Hard, 0.5rem)
    var(--Shapes-Border-Hard, 0.5rem) 0.125rem;
  border: none;
  background: var(--Colors-GrayScale-White, #fcfcff);
`;
