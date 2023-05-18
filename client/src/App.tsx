import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './reset.scss';
import './App.scss';
// router 경로들 import
import Main from 'pages/Main';
import Login from 'pages/Login';
import Compose from 'pages/Compose';
import Relay from 'pages/Relay';
import Mypage from 'pages/Mypage';
import Albums from 'pages/Albums';
import MainLayout from 'pages/MainLayout';
import Notfound from 'pages/Notfound';
import Article from 'pages/Article';
import Board from 'pages/Board';
import ArticleWrite from 'pages/ArticleWrite';
import Studio from 'pages/Studio';
import RelayStudio from 'pages/RelayStudio';
import GoogleLogin from 'pages/GoogleLogin';
import Docs from 'pages/Docs';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login/google" element={<GoogleLogin />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/board" element={<Board />} />
            <Route path="/compose" element={<Compose />} />
            <Route path="/relay" element={<Relay />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/board/:articleId" element={<Article />} />
            <Route path="/board/write" element={<ArticleWrite />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/*" element={<Notfound />} />
          </Route>
          <Route path="/studio" element={<Studio />} />
          <Route path="/relay/:relayStudioId" element={<RelayStudio />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
