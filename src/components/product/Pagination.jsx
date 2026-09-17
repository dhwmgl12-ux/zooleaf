import React from 'react';
import styled from '@emotion/styled';
import { theme } from '../../styles/variables';

const Pagination = ({ currentPage = 1, totalPages = 5, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Container>
      <NavButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="이전 페이지"
      >
        &lt;
      </NavButton>

      {pages.map((page) => (
        <PageButton
          key={page}
          isActive={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PageButton>
      ))}

      <NavButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="다음 페이지"
      >
        &gt;
      </NavButton>
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 32px;
`;

const PageButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: ${(props) => (props.isActive ? 'bold' : 'normal')};
  background-color: ${(props) => (props.isActive ? theme.colors.paginationActive : theme.colors.paginationBackground)};
  color: ${(props) => (props.isActive ? theme.colors.white : theme.colors.paginationText)};
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.isActive ? theme.colors.paginationActive : theme.colors.paginationHover)};
  }
`;

const NavButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: ${theme.colors.paginationDisabled};
  cursor: pointer;

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;
