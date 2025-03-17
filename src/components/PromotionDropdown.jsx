import styled from "styled-components";
import PropTypes from 'prop-types';
import MessageArrow from "../assets/MessageArrow.svg";

const DropdownContainer = styled.div`
    position: relative;

    &:hover {
        & > div:last-child {
            visibility: ${props => props.$hasItems ? 'visible' : 'hidden'};
            opacity: ${props => props.$hasItems ? '1' : '0'};
            transform: translateY(0);
        }
    }
`;

const DropdownContent = styled.div`
    position: absolute;
    top: calc(100% + 24px);
    left: 0;
    width: 160px;
    visibility: hidden;
    opacity: 0;
    transform: translateY(-8px);
    transition: all 0.3s ease;
    padding: 4px 0px;
    flex-direction: column;
    align-items: flex-start;
    display: flex;
    border-radius: 8px;
    background: var(--Colors-GrayScale-White, #FCFCFF);
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
    z-index: 1000;

    &::before {
        content: '';
        position: absolute;
        top: -12px;
        left: 50%;
        transform: translateX(-50%);
        width: 22px;
        height: 13px;
        background-image: url(${MessageArrow});
        background-size: contain;
        background-repeat: no-repeat;
        z-index: 1000;
        filter: drop-shadow(0px -2px 2px rgba(0, 0, 0, 0.1));
    }
`;

const DropdownItem = styled.div`
    color: var(--Colors-GrayScale-G600, #1A1A23);
    width: 100%;
    font-family: "SUIT Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    letter-spacing: -0.4px;
    display: flex;
    padding: 4px 16px;
    align-items: center;
    gap: 8px;
    box-sizing: border-box;
    cursor: pointer;
    position: relative;
    
    &:hover {
        background-color: rgba(0, 0, 0, 0.04);
    }

    &:not(:last-child) {
        border-bottom: 1px solid var(--Colors-GrayScale-G200, #F3F5F8);
    }
`;

const PromotionDropdown = ({ 
    items = [], 
    onItemClick,
    children 
}) => {
    return (
        <DropdownContainer $hasItems={items.length > 0}>
            {children}
            <DropdownContent>
                {items.map((item, index) => (
                    <DropdownItem 
                        key={index}
                        onClick={() => onItemClick?.(item)}
                    >
                        {item}
                    </DropdownItem>
                ))}
            </DropdownContent>
        </DropdownContainer>
    );
};

PromotionDropdown.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string),
    onItemClick: PropTypes.func,
    children: PropTypes.node
};

export default PromotionDropdown;