function Portfolio() {
  return(
    <section className="portfolio">
      <h3 className='portfolio__title'>Портфолио</h3>
      <ul className='portfolio__list'>
        <li className='portfolio__project'>
          <a className="portfolio__project-link" target="_blank" rel="noopener noreferrer" href='https://github.com/EvdokimMellin/how-to-learn'>
            <p className='portfolio__project-name'>Статичный сайт</p>
            <p className='portfolio__project-arrow'>↗</p>
          </a>
        </li>
        <li className='portfolio__project'>
          <a className="portfolio__project-link" target="_blank" rel="noopener noreferrer" href='https://github.com/EvdokimMellin/russian-travel'>
            <p className='portfolio__project-name'>Адаптивный сайт</p>
            <p className='portfolio__project-arrow'>↗</p>
          </a>
        </li>
        <li className='portfolio__project'>
          <a className="portfolio__project-link" target="_blank" rel="noopener noreferrer" href='https://github.com/EvdokimMellin/react-mesto-api-full'>
            <p className='portfolio__project-name'>Одностраничное приложение</p>
            <p className='portfolio__project-arrow'>↗</p>
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;
