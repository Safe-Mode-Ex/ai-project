import { AppBar, Badge, Container, IconButton, Toolbar, Typography } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Link } from 'react-router-dom'
import './Header.css'

function Header({ cartCount }) {
  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Container maxWidth="xl">
        <Toolbar disableGutters className="header">
          <Typography component={Link} to="/" variant="h6" className="header__title">
            Tech Store
          </Typography>
          <IconButton component={Link} to="/cart" color="inherit" aria-label="Перейти в корзину">
            <Badge badgeContent={cartCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
