import React from 'react'
import './NavBar.css'
import { Link, withRouter } from 'react-router-dom';


const NavBar = () =>(
<body>
  <nav class="navbar">
    <ul class="navbar-nav">
      <li class="logo">
        <Link to={'/'} class="nav-link">
          <span class="link-text logo-text">Leloir</span>
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fad"
            data-icon="angle-double-right"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            class="svg-inline--fa fa-angle-double-right fa-w-14 fa-5x"
          >
            <g class="fa-group">
              <path
                fill="currentColor"
                d="M224 273L88.37 409a23.78 23.78 0 0 1-33.8 0L32 386.36a23.94 23.94 0 0 1 0-33.89l96.13-96.37L32 159.73a23.94 23.94 0 0 1 0-33.89l22.44-22.79a23.78 23.78 0 0 1 33.8 0L223.88 239a23.94 23.94 0 0 1 .1 34z"
                class="fa-secondary"
              ></path>
              <path
                fill="currentColor"
                d="M415.89 273L280.34 409a23.77 23.77 0 0 1-33.79 0L224 386.26a23.94 23.94 0 0 1 0-33.89L320.11 256l-96-96.47a23.94 23.94 0 0 1 0-33.89l22.52-22.59a23.77 23.77 0 0 1 33.79 0L416 239a24 24 0 0 1-.11 34z"
                class="fa-primary"
              ></path>
            </g>
          </svg>
          </Link>
      </li>

      <li class="nav-item">
        <Link to={'/pacientes'} class="nav-link">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="users" class="svg-inline--fa fa-users fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z" class="fa-secondary"></path></svg>
          <span class="link-text">Pacientes</span>

        </Link>
      </li>

      <li class="nav-item">
        <Link to="/analisis" class="nav-link">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="file-signature" class="svg-inline--fa fa-file-signature fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M218.17 424.14c-2.95-5.92-8.09-6.52-10.17-6.52s-7.22.59-10.02 6.19l-7.67 15.34c-6.37 12.78-25.03 11.37-29.48-2.09L144 386.59l-10.61 31.88c-5.89 17.66-22.38 29.53-41 29.53H80c-8.84 0-16-7.16-16-16s7.16-16 16-16h12.39c4.83 0 9.11-3.08 10.64-7.66l18.19-54.64c3.3-9.81 12.44-16.41 22.78-16.41s19.48 6.59 22.77 16.41l13.88 41.64c19.75-16.19 54.06-9.7 66 14.16 1.89 3.78 5.49 5.95 9.36 6.26v-82.12l128-127.09V160H248c-13.2 0-24-10.8-24-24V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24v-40l-128-.11c-16.12-.31-30.58-9.28-37.83-23.75zM384 121.9c0-6.3-2.5-12.4-7-16.9L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1zm-96 225.06V416h68.99l161.68-162.78-67.88-67.88L288 346.96zm280.54-179.63l-31.87-31.87c-9.94-9.94-26.07-9.94-36.01 0l-27.25 27.25 67.88 67.88 27.25-27.25c9.95-9.94 9.95-26.07 0-36.01z" class="fa-secondary"></path></svg>
          <span class="link-text">Análisis</span>
        </Link>
      </li>

      <li class="nav-item">
        <Link to="/muestras" class="nav-link">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="vials" class="svg-inline--fa fa-vials fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M72 64h24v240c0 44.1 35.9 80 80 80s80-35.9 80-80V64h24c4.4 0 8-3.6 8-8V8c0-4.4-3.6-8-8-8H72c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm72 0h64v96h-64V64zm480 384H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h608c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM360 64h24v240c0 44.1 35.9 80 80 80s80-35.9 80-80V64h24c4.4 0 8-3.6 8-8V8c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm72 0h64v96h-64V64z" class="fa-secondary"></path></svg>
          <span class="link-text">Muestras</span>
        </Link>
      </li>

      <li class="nav-item">
        <Link to="/obras_sociales" class="nav-link">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="first-aid" class="svg-inline--fa fa-first-aid fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M0 80v352c0 26.5 21.5 48 48 48h48V32H48C21.5 32 0 53.5 0 80zm128 400h320V32H128v448zm64-248c0-4.4 3.6-8 8-8h56v-56c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v56h56c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8h-56v56c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-56h-56c-4.4 0-8-3.6-8-8v-48zM528 32h-48v448h48c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z" class="fa-secondary"></path></svg>
            <span class="link-text">Obras sociales</span>
        </Link>
    </li>

      <li class="nav-item">
        <Link to="/determinaciones" class="nav-link">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="flask" class="svg-inline--fa fa-flask fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M437.2 403.5L320 215V64h8c13.3 0 24-10.7 24-24V24c0-13.3-10.7-24-24-24H120c-13.3 0-24 10.7-24 24v16c0 13.3 10.7 24 24 24h8v151L10.8 403.5C-18.5 450.6 15.3 512 70.9 512h306.2c55.7 0 89.4-61.5 60.1-108.5zM137.9 320l48.2-77.6c3.7-5.2 5.8-11.6 5.8-18.4V64h64v160c0 6.9 2.2 13.2 5.8 18.4l48.2 77.6h-172z" class="fa-secondary"></path></svg>
          <span class="link-text">Determinaciones</span>
        </Link>
      </li>

      <li class="nav-item">
        <Link to="/diario-practicas" class="nav-link">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="diagnoses" class="svg-inline--fa fa-diagnoses fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M496 256c8.8 0 16-7.2 16-16s-7.2-16-16-16-16 7.2-16 16 7.2 16 16 16zm-176-80c48.5 0 88-39.5 88-88S368.5 0 320 0s-88 39.5-88 88 39.5 88 88 88zM59.8 364c10.2 15.3 29.3 17.8 42.9 9.8 16.2-9.6 56.2-31.7 105.3-48.6V416h224v-90.7c49.1 16.8 89.1 39 105.3 48.6 13.6 8 32.7 5.3 42.9-9.8l17.8-26.7c8.8-13.2 7.6-34.6-10-45.1-11.9-7.1-29.7-17-51.1-27.4-28.1 46.1-99.4 17.8-87.7-35.1C409.3 217.2 365.1 208 320 208c-57 0-112.9 14.5-160 32.2-.2 40.2-47.6 63.3-79.2 36-11.2 6-21.3 11.6-28.7 16-17.6 10.5-18.8 31.8-10 45.1L59.8 364zM368 344c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm-96-96c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm-160 8c8.8 0 16-7.2 16-16s-7.2-16-16-16-16 7.2-16 16 7.2 16 16 16zm512 192H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h608c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16z" class="fa-secondary"></path></svg>
            <span class="link-text">Diario de Prácticas</span>
        </Link>
    </li>

      <li class="nav-item">
          <Link to="/caja" class="nav-link">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="cash-register" class="svg-inline--fa fa-cash-register fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M511.1 378.8l-26.7-160c-2.6-15.4-15.9-26.7-31.6-26.7H208v-64h96c8.8 0 16-7.2 16-16V16c0-8.8-7.2-16-16-16H48c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16h96v64H59.1c-15.6 0-29 11.3-31.6 26.7L.8 378.7c-.6 3.5-.9 7-.9 10.5V480c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32v-90.7c.1-3.5-.2-7-.8-10.5zM280 248c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16h-16c-8.8 0-16-7.2-16-16v-16zm-32 64h16c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16h-16c-8.8 0-16-7.2-16-16v-16c0-8.8 7.2-16 16-16zm-32-80c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16h-16c-8.8 0-16-7.2-16-16v-16c0-8.8 7.2-16 16-16h16zM80 80V48h192v32H80zm40 200h-16c-8.8 0-16-7.2-16-16v-16c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16zm16 64v-16c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16v16c0 8.8-7.2 16-16 16h-16c-8.8 0-16-7.2-16-16zm216 112c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h176c4.4 0 8 3.6 8 8v16zm24-112c0 8.8-7.2 16-16 16h-16c-8.8 0-16-7.2-16-16v-16c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16v16zm48-80c0 8.8-7.2 16-16 16h-16c-8.8 0-16-7.2-16-16v-16c0-8.8 7.2-16 16-16h16c8.8 0 16 7.2 16 16v16z" class="fa-secondary"></path></svg>
              <span class="link-text">Caja</span>
          </Link>
      </li>

      <li class="nav-item">
          <Link to="/reportes" class="nav-link">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chart-bar" class="svg-inline--fa fa-chart-bar fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M332.8 320h38.4c6.4 0 12.8-6.4 12.8-12.8V172.8c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v134.4c0 6.4 6.4 12.8 12.8 12.8zm96 0h38.4c6.4 0 12.8-6.4 12.8-12.8V76.8c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v230.4c0 6.4 6.4 12.8 12.8 12.8zm-288 0h38.4c6.4 0 12.8-6.4 12.8-12.8v-70.4c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v70.4c0 6.4 6.4 12.8 12.8 12.8zm96 0h38.4c6.4 0 12.8-6.4 12.8-12.8V108.8c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v198.4c0 6.4 6.4 12.8 12.8 12.8zM496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z" class="fa-secondary"></path></svg>
              <span class="link-text">Reportes</span>
          </Link>
      </li>

      <li class="nav-item">
          <Link to="/ajustes" class="nav-link">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="cogs" class="svg-inline--fa fa-cogs fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M512.1 191l-8.2 14.3c-3 5.3-9.4 7.5-15.1 5.4-11.8-4.4-22.6-10.7-32.1-18.6-4.6-3.8-5.8-10.5-2.8-15.7l8.2-14.3c-6.9-8-12.3-17.3-15.9-27.4h-16.5c-6 0-11.2-4.3-12.2-10.3-2-12-2.1-24.6 0-37.1 1-6 6.2-10.4 12.2-10.4h16.5c3.6-10.1 9-19.4 15.9-27.4l-8.2-14.3c-3-5.2-1.9-11.9 2.8-15.7 9.5-7.9 20.4-14.2 32.1-18.6 5.7-2.1 12.1.1 15.1 5.4l8.2 14.3c10.5-1.9 21.2-1.9 31.7 0L552 6.3c3-5.3 9.4-7.5 15.1-5.4 11.8 4.4 22.6 10.7 32.1 18.6 4.6 3.8 5.8 10.5 2.8 15.7l-8.2 14.3c6.9 8 12.3 17.3 15.9 27.4h16.5c6 0 11.2 4.3 12.2 10.3 2 12 2.1 24.6 0 37.1-1 6-6.2 10.4-12.2 10.4h-16.5c-3.6 10.1-9 19.4-15.9 27.4l8.2 14.3c3 5.2 1.9 11.9-2.8 15.7-9.5 7.9-20.4 14.2-32.1 18.6-5.7 2.1-12.1-.1-15.1-5.4l-8.2-14.3c-10.4 1.9-21.2 1.9-31.7 0zm-10.5-58.8c38.5 29.6 82.4-14.3 52.8-52.8-38.5-29.7-82.4 14.3-52.8 52.8zM386.3 286.1l33.7 16.8c10.1 5.8 14.5 18.1 10.5 29.1-8.9 24.2-26.4 46.4-42.6 65.8-7.4 8.9-20.2 11.1-30.3 5.3l-29.1-16.8c-16 13.7-34.6 24.6-54.9 31.7v33.6c0 11.6-8.3 21.6-19.7 23.6-24.6 4.2-50.4 4.4-75.9 0-11.5-2-20-11.9-20-23.6V418c-20.3-7.2-38.9-18-54.9-31.7L74 403c-10 5.8-22.9 3.6-30.3-5.3-16.2-19.4-33.3-41.6-42.2-65.7-4-10.9.4-23.2 10.5-29.1l33.3-16.8c-3.9-20.9-3.9-42.4 0-63.4L12 205.8c-10.1-5.8-14.6-18.1-10.5-29 8.9-24.2 26-46.4 42.2-65.8 7.4-8.9 20.2-11.1 30.3-5.3l29.1 16.8c16-13.7 34.6-24.6 54.9-31.7V57.1c0-11.5 8.2-21.5 19.6-23.5 24.6-4.2 50.5-4.4 76-.1 11.5 2 20 11.9 20 23.6v33.6c20.3 7.2 38.9 18 54.9 31.7l29.1-16.8c10-5.8 22.9-3.6 30.3 5.3 16.2 19.4 33.2 41.6 42.1 65.8 4 10.9.1 23.2-10 29.1l-33.7 16.8c3.9 21 3.9 42.5 0 63.5zm-117.6 21.1c59.2-77-28.7-164.9-105.7-105.7-59.2 77 28.7 164.9 105.7 105.7zm243.4 182.7l-8.2 14.3c-3 5.3-9.4 7.5-15.1 5.4-11.8-4.4-22.6-10.7-32.1-18.6-4.6-3.8-5.8-10.5-2.8-15.7l8.2-14.3c-6.9-8-12.3-17.3-15.9-27.4h-16.5c-6 0-11.2-4.3-12.2-10.3-2-12-2.1-24.6 0-37.1 1-6 6.2-10.4 12.2-10.4h16.5c3.6-10.1 9-19.4 15.9-27.4l-8.2-14.3c-3-5.2-1.9-11.9 2.8-15.7 9.5-7.9 20.4-14.2 32.1-18.6 5.7-2.1 12.1.1 15.1 5.4l8.2 14.3c10.5-1.9 21.2-1.9 31.7 0l8.2-14.3c3-5.3 9.4-7.5 15.1-5.4 11.8 4.4 22.6 10.7 32.1 18.6 4.6 3.8 5.8 10.5 2.8 15.7l-8.2 14.3c6.9 8 12.3 17.3 15.9 27.4h16.5c6 0 11.2 4.3 12.2 10.3 2 12 2.1 24.6 0 37.1-1 6-6.2 10.4-12.2 10.4h-16.5c-3.6 10.1-9 19.4-15.9 27.4l8.2 14.3c3 5.2 1.9 11.9-2.8 15.7-9.5 7.9-20.4 14.2-32.1 18.6-5.7 2.1-12.1-.1-15.1-5.4l-8.2-14.3c-10.4 1.9-21.2 1.9-31.7 0zM501.6 431c38.5 29.6 82.4-14.3 52.8-52.8-38.5-29.6-82.4 14.3-52.8 52.8z" class="fa-secondary"></path></svg>
              <span class="link-text">Ajustes</span>
          </Link>
      </li>

      <li class="nav-item" id="themeButton">
          <Link to="/logout" class="nav-link">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sign-out-alt" class="svg-inline--fa fa-sign-out-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z" class="fa-secondary"></path></svg>
            <span class="link-text">Cerrar sesión</span>
          </Link>
        </li>
    </ul>
  </nav> 
  </body>
)

export default withRouter(NavBar)
