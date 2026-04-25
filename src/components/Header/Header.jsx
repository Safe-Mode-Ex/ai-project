import { AppBar, Badge, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import './Header.css';

/**
 * @typedef {Object} HeaderProps
 * @property {number} cartCount - Количество товаров в корзине для отображения в бейдже
 */

/**
 * Компонент шапки приложения с навигацией.
 * Содержит логотип-ссылку на главную страницу и иконку корзины с бейджем.
 *
 * @param {HeaderProps} props
 * @returns {JSX.Element}
 */
export function Header({ cartCount }) {
  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Container maxWidth="xl">
        <Toolbar disableGutters className="header">
          <Typography component={Link} to="/" variant="h6" className="header__title">
            Tech Store
          </Typography>
          <div className="header__nav">
            <Button component={Link} to="/catalog" color="inherit" className="header__catalog-link">
              Каталог
            </Button>
            <IconButton component={Link} to="/cart" color="inherit" aria-label="Перейти в корзину">
              <Badge badgeContent={cartCount} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
