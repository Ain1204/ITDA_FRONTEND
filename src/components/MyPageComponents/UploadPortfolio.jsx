import { useState, useRef } from 'react';
import styled from 'styled-components';
import GrayX from '../../assets/MyPageIcon/Gray_X.svg';
import BlueX from '../../assets/MyPageIcon/Blue_X.svg';
import PropTypes from 'prop-types';

const PortfolioContainer = styled.div`
    width: 100%;
`;

const LabelContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
`;

const SectionLabel = styled.span`
    color: var(--Colors-GrayScale-G600, #1A1A23);
    font-family: "SUIT Variable";
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    letter-spacing: -0.025rem;
`;

const DropZone = styled.div`
    display: flex;
    width: 100%;
    min-height: 36.1875rem; /* 최소 높이만 설정하여 반응형으로 만듦 */
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    align-self: stretch;
    border-radius: var(--Shapes-Border-Hard, 0.5rem);
    border: 2px solid var(--Colors-GrayScale-G200, #F3F5F8);
    background: var(--Colors-GrayScale-G100, #F8F9FC);
    box-shadow: 0px 0px 8px 0px rgba(26, 26, 35, 0.12) inset;
    position: relative;
    cursor: pointer;
`;

const DropZoneText = styled.p`
    color: var(--Colors-GrayScale-G600, #1A1A23);
    text-align: center;
    font-family: "SUIT Variable";
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    letter-spacing: -0.03125rem;
`;

const OrText = styled.p`
    color: var(--Colors-GrayScale-G500, #4F5462);
    text-align: center;
    font-family: "SUIT Variable";
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: 168%;
    letter-spacing: -0.02188rem;
`;

const FileInput = styled.input`
    display: none;
`;

const FileSelectButton = styled.button`
    display: inline-flex;
    padding: 0.5rem 1rem;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.5rem;
    background: var(--Colors-Primary-B400, #3D85FF);
    color: var(--Colors-GrayScale-White, #FCFCFF);
    text-align: center;
    font-family: "SUIT Variable";
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 500;
    line-height: 132%;
    letter-spacing: -0.01875rem;
    border: none;
    cursor: pointer;
    
    &:active {
        background: var(--Colors-Primary-B500, #0051FF);
    }
`;

const UploadedFilesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
`;

const FileTag = styled.div`
    display: inline-flex;
    padding: 0.5rem 0.75rem 0.5rem 1rem;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.5rem;
    background: ${props => props.isHovered || props.isActive ? 'var(--Colors-Secondary-B100, #EBF2FF)' : 'transparent'};
    color: ${props => props.isHovered || props.isActive ? 'var(--Colors-Primary-B500, #0051FF)' : 'var(--Colors-GrayScale-G400, #949BAD)'};
    text-align: center;
    font-family: "SUIT Variable";
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    letter-spacing: -0.025rem;
    cursor: pointer;
    
    &:active {
        background: var(--Colors-Secondary-B200, #D6E4FF);
    }
`;

const FileRemoveIcon = styled.img`
    width: 0.75rem;
    height: 0.75rem;
`;

const UploadPortfolio = ({ title, onFilesChange}) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [hoveredFileIndex, setHoveredFileIndex] = useState(null);
    const [activeFileIndex, setActiveFileIndex] = useState(null);
    
    const fileInputRef = useRef(null);
    const dropZoneRef = useRef(null);

    const handleFileSelect = () => {
        fileInputRef.current.click();
    };
    
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
        const newFiles = [...uploadedFiles, ...files];
        setUploadedFiles(newFiles);
        if (onFilesChange) {
            onFilesChange(newFiles);
        }
        }
        // 파일 선택 후 input 초기화
        e.target.value = '';
    };
    
    const handleFileRemove = (index) => {
        const newFiles = uploadedFiles.filter((_, i) => i !== index);
        setUploadedFiles(newFiles);
        setHoveredFileIndex(null);
        setActiveFileIndex(null);
        if (onFilesChange) {
        onFilesChange(newFiles);
        }
    };
    
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
        const newFiles = [...uploadedFiles, ...files];
        setUploadedFiles(newFiles);
        if (onFilesChange) {
            onFilesChange(newFiles);
        }
        }
    };

    return (
        <PortfolioContainer>
        {title && (
            <LabelContainer>
                <SectionLabel>{title}</SectionLabel>
            </LabelContainer>
        )}
        
        <DropZone 
            ref={dropZoneRef}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleFileSelect}
        >
            <DropZoneText>업로드할 파일 놓기</DropZoneText>
            <OrText>또는</OrText>
            <FileSelectButton onClick={(e) => {
            e.stopPropagation();
            handleFileSelect();
            }}>
            파일선택
            </FileSelectButton>
            
            {uploadedFiles.length > 0 && (
            <UploadedFilesContainer onClick={(e) => e.stopPropagation()}>
                {uploadedFiles.map((file, index) => (
                <FileTag 
                    key={`${file.name}-${index}`}
                    isHovered={hoveredFileIndex === index}
                    isActive={activeFileIndex === index}
                    onMouseEnter={() => setHoveredFileIndex(index)}
                    onMouseLeave={() => setHoveredFileIndex(null)}
                    onMouseDown={() => setActiveFileIndex(index)}
                    onMouseUp={() => setActiveFileIndex(null)}
                >
                    {file.name}
                    <FileRemoveIcon 
                    src={hoveredFileIndex === index || activeFileIndex === index ? BlueX : GrayX} 
                    alt="삭제" 
                    onClick={(e) => {
                        e.stopPropagation();
                        handleFileRemove(index);
                    }}
                    />
                </FileTag>
                ))}
            </UploadedFilesContainer>
            )}
            
            <FileInput 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            multiple
            />
        </DropZone>
        </PortfolioContainer>
    );
};

UploadPortfolio.propTypes = {
    title: PropTypes.string,
    onFilesChange: PropTypes.func,
};

export default UploadPortfolio;
