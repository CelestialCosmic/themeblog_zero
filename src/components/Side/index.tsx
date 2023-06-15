import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import color from 'color'
import { random } from '@/utils'
import { queryLike } from '@utils/service'
import { useLocalStorage } from '@/utils/hook'
import ShootingStar from '@components/ShootingStar'
import Panel from '@components/Panel'
import Poetry from '@components/Poetry'
import { Theme, ThemeType } from '@/type'
import './index.css'
import {
  Home,
  Inbox,
  Book,
  Message,
  Moon,
  Heart,
  User,
  Github,
  Twitter,
  Telegram,
  Mail,
  Music,
  Butterfly,
} from '@components/Icons'
import config from '@/config'
import ririwhite from '@assets/images/white.jpg'
import ririblack from '@assets/images/iblack.jpg'

const { github, telegram} = config.contact

type SideProps = {}

const list: Theme[] = [
  { type: 'white', name: '莉莉白', color: '#BDC0BA', image: 'white' },
  { type: 'black', name: '莉莉黑', color: '#080808', image: 'black' }
]
const randomTheme = list[random(0, list.length)]

const Side: React.FC<SideProps> = () => {
  const location = useLocation()
  const pathname = location.pathname
  const [showPanel, setShowPanel] = useState(false)
  const [isLoad, setIsLoad] = useState(false)
  const [theme, setTheme] = useLocalStorage<ThemeType>('theme', randomTheme.type, 24 * 60 * 60 * 1000)
  const [likeSite, setLikeSite] = useLocalStorage<boolean>('like', false)
  const [likeCount, setLikeCount] = useState(0)
  const handleLike = () => {
    if (likeSite) return
    queryLike().then((data) => {
      setLikeCount(data)
      setLikeSite(true)
    })
  }

  useEffect(() => {
    queryLike('getTimes').then((data) => {
      setLikeCount(data)
    })
  }, [])

  const toggleTheme = (theme: ThemeType) => setTheme(theme)
  const togglePanle = () => {
    if (!isLoad) {
      setIsLoad(true)
      list.forEach((e) => {
        const img = new Image()
        img.src = e.image
      })
    }
    setShowPanel((c) => !c)
  }

  useLayoutEffect(() => {
    const t = list.find((e) => e.type === theme)!
    document.documentElement.style.setProperty('--theme-color', t.color)
    document.documentElement.style.setProperty('--background-color', color(t.color).alpha(0.2).string())
    document.documentElement.style.setProperty('--background-image', `url('${t.image}')`)
    document.getElementsByTagName('body')[0].className = theme
  }, [theme])

  return (
    <div className="side fixed top-0 left-0 h-full overflow-hidden hidden lg:flex flex-col justify-between">
      <ShootingStar />
      {showPanel && (
        <Panel
          likeSite={likeSite}
          likeCount={likeCount}
          list={list}
          theme={theme}
          toggleTheme={toggleTheme}
          togglePanle={togglePanle}
          handleLike={handleLike}
        />
      )}

      {/* side menu */}
      <div className="w-full h-3/5 flex justify-end z-10">
        <nav className="nav nav-y flex flex-col justify-end items-center w-12">
          <Link className={clsx(pathname === '/' && 'active')} to="/" data-name="首页">
            <Home />
          </Link>
          {/* <Link className={clsx(pathname === '/inspiration' && 'active')} to="/inspiration" data-name="灵感">
            <Message />
          </Link>
          <Link className={clsx(pathname === '/project' && 'active')} to="/project" data-name="项目">
            <Inbox />
          </Link>
          <Link className={clsx(pathname === '/book' && 'active')} to="/book" data-name="书单">
            <Book />
          </Link> */}
          <Link className={clsx(pathname === '/friend' && 'active')} to="/friend" data-name="友邻">
            <Heart />
          </Link>
          <Link className={clsx(pathname === '/about' && 'active')} to="/about" data-name="自述">
            <User />
          </Link>
        </nav>
        <div className="head flex flex-col justify-end pl-3 pb-3 w-2/3">
          <h3 className="title text-6xl tracking-wider">繁星集</h3>
          <span className="subtitle pt-2 pb-8 pl-1 text-xl tracking-wider">Celestial的杂货间</span>
          {/* <Poetry /> */}
        </div>
      </div>

      {/* footer menu */}
      <div className="flex justify-end py-12">
        <div className="nya" data-name="莉莉白" onClick={togglePanle}>
          <Butterfly />
        </div>
        <div className="nav nav-x flex items-center w-2/3 h-12 ">
          <a href={github} rel="noopener noreferrer" target="_blank">
            <Github />
          </a>
          {/* <a href={twitter} rel="noopener noreferrer" target="_blank">
            <Twitter />
          </a> */}
          <a href={telegram} rel="noopener noreferrer" target="_blank">
            <Telegram />
          </a>
          {/* <a href={email} rel="noopener noreferrer" target="_blank">
            <Mail />
          </a> */}
          {/* <a href={music} rel="noopener noreferrer" target="_blank">
            <Music />
          </a> */}
          {/* <a href={blog} rel="noopener noreferrer" target="_blank">
            <Moon />
          </a> */}
        </div>
      </div>
    </div>
  )
}

export default Side
