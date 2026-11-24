import { useState } from 'react'
import { categorias, produtos } from './products'

const formatar = (valor) => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

function Header({ qtdCarrinho, abrirCarrinho }) {
  return (
    <header className="header">
      <div className="container header-inner">
        <a href="#inicio" className="logo">💪 Power<span>Fit</span></a>
        <nav className="nav">
          <a href="#produtos">Produtos</a>
          <a href="#sobre">Sobre</a>
          <a href="#contato">Contato</a>
        </nav>
        <button className="btn-carrinho" onClick={abrirCarrinho}>
          🛒 <span className="badge">{qtdCarrinho}</span>
        </button>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="container hero-inner">
        <div>
          <span className="tag">🔥 Black Friday: até 30% OFF</span>
          <h1>Suplementos para quem leva o treino a sério</h1>
          <p>Whey, creatina, pré-treino e vitaminas das melhores marcas, com entrega rápida para todo o Brasil.</p>
          <a href="#produtos" className="btn-primario">Ver produtos</a>
        </div>
        <div className="hero-emoji">🏋️‍♂️</div>
      </div>
    </section>
  )
}

function Beneficios() {
  const itens = [
    { icone: '🚚', titulo: 'Frete grátis', texto: 'Em compras acima de R$ 199' },
    { icone: '💳', titulo: 'Até 10x sem juros', texto: 'No cartão de crédito' },
    { icone: '✅', titulo: 'Produtos originais', texto: 'Direto dos fabricantes' },
    { icone: '🔒', titulo: 'Compra segura', texto: 'Seus dados protegidos' },
  ]
  return (
    <section className="container beneficios">
      {itens.map((i) => (
        <div key={i.titulo} className="beneficio">
          <span>{i.icone}</span>
          <div>
            <strong>{i.titulo}</strong>
            <p>{i.texto}</p>
          </div>
        </div>
      ))}
    </section>
  )
}

function CardProduto({ produto, adicionar }) {
  const desconto = produto.precoAntigo
    ? Math.round((1 - produto.preco / produto.precoAntigo) * 100)
    : null
  return (
    <div className="card">
      <div className="card-img" style={{ background: produto.cor }}>
        {desconto && <span className="desconto">-{desconto}%</span>}
        <span className="card-emoji">{produto.emoji}</span>
      </div>
      <div className="card-body">
        <small className="categoria">{produto.categoria}</small>
        <h3>{produto.nome}</h3>
        <p className="descricao">{produto.descricao}</p>
        <div className="nota">⭐ {produto.nota.toFixed(1)}</div>
        <div className="precos">
          {produto.precoAntigo && <span className="preco-antigo">{formatar(produto.precoAntigo)}</span>}
          <span className="preco">{formatar(produto.preco)}</span>
        </div>
        <button className="btn-primario btn-full" onClick={() => adicionar(produto)}>
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  )
}

function Produtos({ adicionar }) {
  const [categoria, setCategoria] = useState('Todos')
  const [busca, setBusca] = useState('')

  const filtrados = produtos.filter(
    (p) =>
      (categoria === 'Todos' || p.categoria === categoria) &&
      p.nome.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <section id="produtos" className="container secao">
      <h2>Nossos produtos</h2>
      <input
        className="busca"
        type="text"
        placeholder="🔍 Buscar produto..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />
      <div className="filtros">
        {categorias.map((c) => (
          <button
            key={c}
            className={c === categoria ? 'filtro ativo' : 'filtro'}
            onClick={() => setCategoria(c)}
          >
            {c}
          </button>
        ))}
      </div>
      {filtrados.length === 0 ? (
        <p className="vazio">Nenhum produto encontrado.</p>
      ) : (
        <div className="grid">
          {filtrados.map((p) => (
            <CardProduto key={p.id} produto={p} adicionar={adicionar} />
          ))}
        </div>
      )}
    </section>
  )
}

function Carrinho({ aberto, fechar, itens, alterarQtd, remover, finalizar }) {
  const total = itens.reduce((soma, i) => soma + i.preco * i.qtd, 0)
  return (
    <>
      <div className={aberto ? 'overlay mostrar' : 'overlay'} onClick={fechar} />
      <aside className={aberto ? 'carrinho aberto' : 'carrinho'}>
        <div className="carrinho-topo">
          <h2>🛒 Seu carrinho</h2>
          <button className="fechar" onClick={fechar}>✕</button>
        </div>
        {itens.length === 0 ? (
          <p className="vazio">Seu carrinho está vazio.</p>
        ) : (
          <>
            <ul className="lista-carrinho">
              {itens.map((i) => (
                <li key={i.id}>
                  <span className="mini-emoji" style={{ background: i.cor }}>{i.emoji}</span>
                  <div className="info">
                    <strong>{i.nome}</strong>
                    <span>{formatar(i.preco)}</span>
                    <div className="qtd">
                      <button onClick={() => alterarQtd(i.id, -1)}>−</button>
                      <span>{i.qtd}</span>
                      <button onClick={() => alterarQtd(i.id, 1)}>+</button>
                    </div>
                  </div>
                  <button className="remover" onClick={() => remover(i.id)}>🗑️</button>
                </li>
              ))}
            </ul>
            <div className="total">
              <span>Total</span>
              <strong>{formatar(total)}</strong>
            </div>
            {total < 199 && (
              <p className="frete">Faltam {formatar(199 - total)} para o frete grátis!</p>
            )}
            <button className="btn-primario btn-full" onClick={finalizar}>Finalizar compra</button>
          </>
        )}
      </aside>
    </>
  )
}

function Sobre() {
  return (
    <section id="sobre" className="sobre">
      <div className="container sobre-inner">
        <div className="sobre-emoji">🥇</div>
        <div>
          <h2>Sobre a PowerFit</h2>
          <p>
            A PowerFit nasceu da paixão pelo esporte e pela vida saudável. Trabalhamos apenas com
            suplementos originais e de qualidade comprovada, para ajudar você a alcançar seus
            objetivos, seja ganhar massa, perder gordura ou melhorar o desempenho.
          </p>
          <div className="numeros">
            <div><strong>+10 mil</strong><span>clientes</span></div>
            <div><strong>+200</strong><span>produtos</span></div>
            <div><strong>4.9 ⭐</strong><span>avaliação</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Contato() {
  const [enviado, setEnviado] = useState(false)
  const enviar = (e) => {
    e.preventDefault()
    setEnviado(true)
    e.target.reset()
  }
  return (
    <section id="contato" className="container secao">
      <h2>Fale conosco</h2>
      <form className="form" onSubmit={enviar}>
        <input type="text" placeholder="Seu nome" required />
        <input type="email" placeholder="Seu e-mail" required />
        <textarea placeholder="Sua mensagem" rows="4" required />
        <button className="btn-primario" type="submit">Enviar mensagem</button>
        {enviado && <p className="sucesso">✅ Mensagem enviada! Responderemos em breve.</p>}
      </form>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>💪 PowerFit Suplementos © {new Date().getFullYear()} · Todos os direitos reservados</p>
        <p className="dev">Desenvolvido em React por Pedro Henrique Campos · Hospedado na Vercel</p>
      </div>
    </footer>
  )
}

export default function App() {
  const [carrinho, setCarrinho] = useState([])
  const [aberto, setAberto] = useState(false)
  const [aviso, setAviso] = useState('')

  const mostrarAviso = (texto) => {
    setAviso(texto)
    setTimeout(() => setAviso(''), 2500)
  }

  const adicionar = (produto) => {
    setCarrinho((atual) => {
      const existe = atual.find((i) => i.id === produto.id)
      if (existe) return atual.map((i) => (i.id === produto.id ? { ...i, qtd: i.qtd + 1 } : i))
      return [...atual, { ...produto, qtd: 1 }]
    })
    mostrarAviso(`${produto.nome} adicionado ao carrinho!`)
  }

  const alterarQtd = (id, delta) => {
    setCarrinho((atual) =>
      atual.map((i) => (i.id === id ? { ...i, qtd: i.qtd + delta } : i)).filter((i) => i.qtd > 0)
    )
  }

  const remover = (id) => setCarrinho((atual) => atual.filter((i) => i.id !== id))

  const finalizar = () => {
    setCarrinho([])
    setAberto(false)
    mostrarAviso('🎉 Pedido realizado com sucesso! Obrigado pela compra.')
  }

  const qtdTotal = carrinho.reduce((s, i) => s + i.qtd, 0)

  return (
    <>
      <Header qtdCarrinho={qtdTotal} abrirCarrinho={() => setAberto(true)} />
      <main>
        <Hero />
        <Beneficios />
        <Produtos adicionar={adicionar} />
        <Sobre />
        <Contato />
      </main>
      <Footer />
      <Carrinho
        aberto={aberto}
        fechar={() => setAberto(false)}
        itens={carrinho}
        alterarQtd={alterarQtd}
        remover={remover}
        finalizar={finalizar}
      />
      {aviso && <div className="toast">{aviso}</div>}
    </>
  )
}
