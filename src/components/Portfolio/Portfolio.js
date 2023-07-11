function Portfolio() {
  return(
    <section className="portfolio">
      <h3 className='portfolio__title'>Портфолио</h3>
      <ul className='portfolio__list'>
        <li className='portfolio__project'>
          <p className='portfolio__project-name'>Статичный сайт</p>
          <p className='portfolio__project-arrow'>↗</p>
        </li>
        <li className='portfolio__project'>
          <p className='portfolio__project-name'>Адаптивный сайт</p>
          <p className='portfolio__project-arrow'>↗</p>
        </li>
        <li className='portfolio__project'>
          <p className='portfolio__project-name'>Одностраничное приложение</p>
          <p className='portfolio__project-arrow'>↗</p>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;
