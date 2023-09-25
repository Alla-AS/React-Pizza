import { Link } from 'react-router-dom'
import cartEmptyImg from '../assets/img/empty-cart.png'

export function CartEmpty() {
  return (
    <div class="cart cart--empty">
      <h2>Корзина пустая <span>😕</span></h2>
      <p>Вероятней всего, вы не заказывали ещё пиццу.
        <br/>
        Для того, чтобы заказать пиццу, перейди на главную страницу.
      </p>
      <img src={cartEmptyImg} alt="Empty cart" />
      <Link to='/'>
        <div class="button button--black">
          <span>Вернуться назад</span>
        </div>
      </Link>
        
    </div>
  )
}