import React from 'react';
import styled from 'styled-components';

const MainLoader = () => {
  return (
    <StyledWrapper className='bg-gradient-to-r from-blue-50 to-indigo-100'>
      <div className="loader">
        <span>Attendify</span>
        <span>Attendify</span>
      </div>
      <div className="circle-loader">
        <div className="spinner"></div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .loader {
    position: relative;
    text-align: center;
    }
    
  .loader span {
    margin-left: 18px;
    position: absolute;
    color: #fff;
    transform: translate(-50%, -50%);
    font-size: 70px;
    letter-spacing: 5px;
  }

  .loader span:nth-child(1) {
    color: transparent;
    -webkit-text-stroke: 0.3px rgb(0, 57, 244);
  }

  .loader span:nth-child(2) {
    color: rgb(0, 4, 255);
    -webkit-text-stroke: 1px rgb(17, 0, 255);
    animation: uiverse723 3s ease-in-out infinite;
  }

  @keyframes uiverse723 {
    0%, 100% {
      clip-path: polygon(0% 45%, 15% 44%, 32% 50%, 
        54% 60%, 70% 61%, 84% 59%, 100% 52%, 100% 100%, 0% 100%);
    }

    50% {
      clip-path: polygon(0% 60%, 16% 65%, 34% 66%, 
        51% 62%, 67% 50%, 84% 45%, 100% 46%, 100% 100%, 0% 100%);
    }
  }

  /* Circular Loader */
  .circle-loader {
    margin-top: 150px;
    position: relative;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .spinner {
    border: 6px solid rgba(255, 255, 255, 0.3);
    border-top: 6px solid rgb(0, 57, 244);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 1025px) {
  
    .loader span {
      font-size: 50px;
      margin-left: 20px;
    }

    .spinner {
      margin-top: 5px;
      width: 40px;
      height: 40px;
    }
  }
`;

export default MainLoader;
