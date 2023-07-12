import { useHistory } from 'react-router-dom';

function NotFoundPage() {
  const history = useHistory();

  function handleBackClick() {
    history.goBack();
  }

  return(
    <main className='not-found'>
      <h1 className='not-found__title'>404</h1>
      <h2 className='not-found__subtitle'>Страница не найдена</h2>
      <button className='not-found__button' onClick={handleBackClick}>Назад</button>
    </main>
  )
}

export default NotFoundPage;
