function Portfolio() {
  return(
    <section className="portfolio">
      <h3 className='portfolio__title'>Портфолио</h3>
      <ul className='portfolio__list'>
        <li className='portfolio__project'>
          <a href='https://github.com/EvdokimMellin/how-to-learn' className='portfolio__project-name'>Статичный сайт</a>
          <p className='portfolio__project-arrow'>↗</p>
        </li>
        <li className='portfolio__project'>
        <a href='https://github.com/EvdokimMellin/russian-travel' className='portfolio__project-name'>Адаптивный сайт</a>
          <p className='portfolio__project-arrow'>↗</p>
        </li>
        <li className='portfolio__project'>
        <a href='https://github.com/EvdokimMellin/react-mesto-api-full' className='portfolio__project-name'>Одностраничное приложение</a>
          <p className='portfolio__project-arrow'>↗</p>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;
