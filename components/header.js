import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  useCartCount,
  useSiteContext,
  useToggleCart,
  useToggleMegaNav,
} from '@lib/context'

import FocusTrap from 'focus-trap-react'
import Icon from '@components/icon'
import Image from 'next/image'
import Link from 'next/link'
import MegaNavigation from '@components/menu-mega-nav'
import Menu from '@components/menu'
import PromoBar from '@components/promo-bar'
import cx from 'classnames'
import { isBrowser } from '@lib/helpers'
import { m } from 'framer-motion'
import { useInView } from 'react-cool-inview'
import { useRect } from '@reach/rect'
import { useRouter } from 'next/router'

const Header = ({ data = {}, isTransparent, onSetup = () => { } }) => {
  // expand our header data


  const {
    promo,
    menuDesktopLeft,
    menuDesktopRight,
    menuMobilePrimary,
    menuMobileSecondary,
  } = data

  // setup states
  const [isMobileNavOpen, setMobileNavOpen] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(null)
  const { observe, inView: observerIsVisible } = useInView()
  const headerRef = useRef()
  const headerRect = useRect(headerRef)
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)

  // setup menu toggle event
  const toggleMobileNav = (state) => {
    setMobileNavOpen(state)

    if (isBrowser) {
      document.body.classList.toggle('overflow-hidden', state)
    }
  }

  // context helpers
  const { meganav } = useSiteContext()
  const toggleMegaNav = useToggleMegaNav()

  useEffect(() => {
    if (headerRect) {
      setHeaderHeight(headerRect.height)
    }
  }, [headerRect])

  useEffect(() => {
    onSetup({ height: headerHeight })
  }, [headerHeight])

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsMobile(isMobile)
  }, [router])


  return (
    <>
      <a href="#content" className="skip-link">
        Skip to Content
      </a>

      <PromoBar data={promo} />

      <header
        className={cx('header', {
          'is-overlay': isTransparent,
          'is-white': isTransparent && !meganav.isOpen && observerIsVisible,
          'has-bg': !observerIsVisible,
        })}
      >
        <div ref={headerRef} className="header--outer">
          <div className="header--inner">
            <div className="header--content">
              <div className="logo">
                <Link href={'/'}>
                  <button
                    className="logo--link"
                    aria-label="Go Home"
                  >
                    {typeof window !== "undefined" && window?.scrollY === 0 && (router.pathname === '/' || router.pathname === '/blog' || router.pathname === '/about') ?
                      <Image src='/secondary_logo/RIPPA LOGOS-11.png' alt='Logo' width={isMobile ? 150 : 250} height={50} objectFit='cover' /> :


                      <Image src='/secondary_logo/RIPPA LOGOS-18.png' alt='Logo' width={isMobile ? 150 : 250} height={50} objectFit='cover' />
                    }
                  </button>
                </Link>
              </div>

              <nav className="" role="navigation">
                {/* Mobile Header Menu */}
                <div id="mobile-nav" className="main-navigation--mobile">
                  <FocusTrap active={isMobileNavOpen}>
                    <div>
                      <button
                        onClick={() => toggleMobileNav(!isMobileNavOpen)}
                        className={cx('menu-toggle', {
                          'is-open': isMobileNavOpen,
                        })}
                        aria-expanded={isMobileNavOpen}
                        aria-controls="mobile-nav"
                        aria-label="Toggle Menu"
                      >
                        <span className="hamburger">
                          <span className="hamburger--icon"></span>
                        </span>
                      </button>
                      <m.div
                        initial="hide"
                        animate={isMobileNavOpen ? 'show' : 'hide'}
                        variants={{
                          show: {
                            x: '0%',
                          },
                          hide: {
                            x: '-100%',
                          },
                        }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="menu-mobile"
                      >
                        <div className="menu-mobile--inner">
                          <div className="menu-mobile--primary">
                            {menuMobilePrimary?.items && (
                              <Menu
                                items={menuMobilePrimary.items}
                                onClick={() => toggleMobileNav(false)}
                              />
                            )}
                          </div>

                          <div className="menu-mobile--secondary">
                            {menuMobileSecondary?.items && (
                              <Menu
                                items={menuMobileSecondary.items}
                                onClick={() => toggleMobileNav(false)}
                              />
                            )}
                          </div>
                        </div>
                      </m.div>

                      <div
                        className={cx('menu-mobile--backdrop', {
                          'is-active': isMobileNavOpen,
                        })}
                        onClick={() => toggleMobileNav(false)}
                      />
                    </div>
                  </FocusTrap>

                  <CartToggle />
                </div>

                {/* Desktop Header Menu */}
                <div className="main-navigation--desktop">
                  <div className="menu-left">
                    {menuDesktopLeft?.items && (
                      <Menu
                        items={menuDesktopLeft.items}
                        onClick={() => toggleMegaNav(false)}
                        useMegaNav
                      />
                    )}
                  </div>

                  <div className="menu-right">
                    {menuDesktopRight?.items && (
                      <Menu
                        items={menuDesktopRight.items}
                        onClick={() => toggleMegaNav(false)}
                        useMegaNav
                      />
                    )}

                    <CartToggle />
                  </div>
                </div>
              </nav>
            </div>

            <div
              className={cx('header--border', {
                'is-hidden': meganav.isOpen,
              })}
            />
          </div>

          <MegaNavigation
            items={[
              ...(menuDesktopLeft?.items || []),
              ...(menuDesktopRight?.items || []),
            ]}
            headerHeight={
              isTransparent && observerIsVisible ? headerHeight : false
            }
          />
        </div>
      </header>

      <span ref={observe} className="header--observer" />
    </>
  )
}

const CartToggle = React.memo(() => {
  const toggleCart = useToggleCart();
  const [checkoutCount, setCheckoutCount] = useState(0);

  const updateCheckoutCount = useCallback((event) => {
    const { quantity } = event?.detail || {};
    quantity
    setCheckoutCount((prevCount) => prevCount + (quantity || 0));
  }, []);

  useEffect(() => {
    let count = 0;
    const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
    existingProducts?.forEach((product) => {
      count += product.quantity || 0;
    });
    setCheckoutCount(count);
  }, [updateCheckoutCount]);

  useEffect(() => {
    typeof window !== 'undefined' &&
      window?.addEventListener('updateCheckoutCount', updateCheckoutCount);
    return () => {
      typeof window !== 'undefined' &&
        window?.removeEventListener('updateCheckoutCount', updateCheckoutCount);
    };
  }, [updateCheckoutCount]);

  return (
    <button className="cart-toggle" onClick={toggleCart}>
      Cart
      <span
        className={cx('cart-toggle--count', {
          'is-active': checkoutCount > 0,
        })}
      >
        {checkoutCount}
      </span>
    </button>
  );
});



const HeaderBackdrop = ({ isActive, onClick }) => {
  return (
    <div
      className={cx('header--backdrop', {
        'is-active': isActive,
      })}
      onClick={onClick}
    />
  )
}

export default Header
