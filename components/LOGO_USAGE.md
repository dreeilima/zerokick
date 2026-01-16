# Logo ZeroKick - Guia de Uso

## Variantes Disponíveis

### 1. Logo Completo (`variant="full"`)

Usa o logo completo com ícone + texto "ZEROKICK"

```tsx
<Logo variant="full" />
```

**Uso recomendado:**

- Header/Navbar principal
- Footer
- Landing page
- Documentação

### 2. Logo Icon (`variant="icon"`)

Usa apenas o ícone da mira com "Z"

```tsx
<Logo variant="icon" />
```

**Uso recomendado:**

- Favicon
- App mobile
- Sidebar colapsada
- Botões pequenos
- Loading states

## Exemplos de Código

### Header com logo completo

```tsx
<header>
  <Logo variant="full" className="h-10" />
</header>
```

### Sidebar com ícone

```tsx
<aside>
  <Logo variant="icon" className="w-8 h-8" />
</aside>
```

### Botão com ícone

```tsx
<Button>
  <Logo variant="icon" className="w-4 h-4 mr-2" />
  Dashboard
</Button>
```

## Arquivos

- `public/logo_small.png` - Ícone apenas (mira com Z)
- `public/logo_full.png` - Logo completo (ícone + ZEROKICK)

## Cores

- **Primary:** Cyan (#06b6d4)
- **Background:** Transparente
- Funciona em light e dark mode
