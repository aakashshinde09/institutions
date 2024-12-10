import { useHasMounted, useScreenWidth, ViewWidth } from '@shared/lib/hooks'
import { Meta } from '@shared/meta'
import { MainPageLayout } from '@widgets/main-layout'
import { StakeFunds } from '@widgets/staking'
import { useAnimate } from 'framer-motion'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type StakingView = 'STAKE' | 'WITHDRAW'

function StakingPage() {
  const [scope, animate] = useAnimate()
  const screen = useScreenWidth()
  const mounted = useHasMounted()
  const searchParameters = useSearchParams()
  const view = searchParameters?.get('view')
  const [mobileTab, setMobileTab] = useState<StakingView>('STAKE')

  const onShowStake = () => {
    animate('#stake-cover', { opacity: 0 }, { delay: 0.5 })
    animate('#stake-cover', { display: 'none' }, { delay: 0.7 })
    animate('#stake-container', { width: '100%' }, { delay: 1 })
    animate('#stake-form', { opacity: 1, display: 'block' }, { delay: 1.5 })
    animate('#stake-container', { backgroundColor: '#ededed' }, { delay: 1.7 })
    animate('#stake-info', { opacity: 1, display: 'block' }, { delay: 1.7 })
  }

  const onShowStakeInstant = () => {
    animate('#stake-cover', { opacity: 0 }, { delay: 0 })
    animate('#stake-cover', { display: 'none' }, { delay: 0 })
    animate('#stake-container', { width: '100%' }, { delay: 0 })
    animate('#stake-form', { opacity: 1, display: 'block' }, { delay: 0 })
    animate('#stake-container', { backgroundColor: '#ededed' }, { delay: 0 })
    animate('#stake-info', { opacity: 1, display: 'block' }, { delay: 0 })
  }

  useEffect(() => {
    if (screen === ViewWidth.MOBILE) {
      setMobileTab('STAKE')
    } else {
      onShowStakeInstant()
    }
  }, [view, screen])

  return (
    <MainPageLayout Meta={<Meta title="LIS | Staking" description="Staking" />}>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        {/* Hero Section */}
        <section className="relative mt-2 h-[calc(100vh-128px)] p-4">
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/40">
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/40">
              <Image
                src="/Mercy-Leonard-in-Malawi.png"
                alt="Hero background"
                className="size-full object-cover sm:object-left"
                style={{ objectPosition: 'left top' }}
                width={1600}
                height={500}
                priority
              />
            </div>
          </div>

          <div className="relative mx-auto flex h-full max-w-7xl flex-col items-end justify-center px-8">
            <div className="max-w-xl text-white">
              <h1 className="mb-4 text-4xl font-bold">
                Stake with Give Directly to share your staking rewards with people who
                need it the most
              </h1>
              <div className="flex justify-center">
                <button className="mt-6 rounded-md bg-primary px-8 py-3 text-lg text-white">
                  STAKE FUNDS
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main
          className="mx-auto grid gap-16 px-8 py-16 md:grid-cols-5"
          style={{ backgroundColor: '#095845' }}
        >
          <div className="col-span-2 my-auto text-center">
            <h2 className="mb-8 text-4xl font-extrabold text-white">
              Make the world a better place while safely holding your ETH and earning
              rewards
            </h2>

            <div className="mx-auto mt-8">
              <img
                src="containerhand.png"
                alt="Container Hand"
                className="mx-auto size-96"
              />
            </div>
          </div>

          <div className="col-span-3 space-y-6">
            {mounted && screen === ViewWidth.MOBILE ? (
              <section className="mt-1">
                {mobileTab === 'STAKE' && (
                  <div className="mx-auto">
                    <StakeFunds />
                  </div>
                )}
              </section>
            ) : (
              <section
                ref={scope}
                className="container mt-1 flex min-h-[46rem] flex-col items-stretch justify-between gap-6 pb-14 md:flex-row"
              >
                <div
                  className="grow md:flex-1 md:shrink-0 md:grow-0"
                  style={{ flexBasis: '60%' }}
                >
                  <StakeFunds onShow={onShowStake} />
                </div>
              </section>
            )}
          </div>
        </main>
        {/* How it Works Section */}
        <section className="bg-gray-100 py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-12 text-center text-4xl font-bold">How does it work?</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Stake */}
              <div className="flex flex-col items-center rounded-lg bg-white ">
                <div className=" w-96 items-center rounded-lg bg-grey p-8 py-12 shadow-md">
                  <div className="mx-auto mb-6 size-32 md:size-48">
                    <img
                      src="/eth-stake-icon.png"
                      alt="Stake ETH"
                      className="size-full"
                    />
                  </div>
                </div>
                <h3 className="mb-2 mt-3 text-xl font-semibold">Stake</h3>
                <p className="text-center text-xl font-semibold">ETH/stETH/wstETH</p>
              </div>

              {/* Earn and Share */}
              <div className="flex flex-col items-center rounded-lg bg-white ">
                <div className=" w-96 items-center rounded-lg bg-grey p-8 py-12 shadow-md">
                  <div className="mx-auto mb-6 size-32 md:size-48">
                    <img src="/earnandshare.png" alt="Stake ETH" className="size-full" />
                  </div>
                </div>
                <h3 className="mb-2 mt-3 text-xl font-semibold">Earn and Share</h3>
                <p className="text-center text-xl font-semibold">
                  Rewards with GiveDirectly
                </p>
              </div>

              {/* Claim Rewards */}
              <div className="flex flex-col items-center rounded-lg bg-white ">
                <div className=" w-96 items-center rounded-lg bg-grey p-8 py-12 shadow-md">
                  <div className="mx-auto mb-6 size-32 md:size-48">
                    <img src="/claim.png" alt="Stake ETH" className="size-full" />
                  </div>
                </div>
                <h3 className="mb-2 mt-3 text-xl font-semibold">
                  Claim Rewards and your
                </h3>
                <p className="text-center text-xl font-semibold">
                  Principal back anytime
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Lido Section */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-12 text-center text-4xl font-bold">Lido</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Curated Operators */}
              <div className="flex flex-col items-center rounded-lg bg-primary p-8 px-12 text-white">
                <div className="mb-6 size-80">
                  <img
                    src="/curatedoperator.png"
                    alt="Curated Operators"
                    className="size-full"
                  />
                </div>
                <h3 className="text-center text-xl font-semibold">Curated Operators</h3>
              </div>

              {/* CSM Node Operators */}
              <div className="flex flex-col items-center rounded-lg bg-primary2 p-8 text-white">
                <div className="mb-6 size-80">
                  <img
                    src="/operator.png"
                    alt="CSM Node Operators"
                    className="size-full"
                  />
                </div>
                <h3 className="text-center text-xl font-semibold">CSM Node Operators</h3>
              </div>

              {/* DVT Protocols */}
              <div className="flex flex-col items-center rounded-lg bg-primary p-8 text-white">
                <div className="mb-6 size-80">
                  <img src="/dvtobol.png" alt="DVT Protocols" className="size-full" />
                </div>
                <h3 className="text-center text-xl font-semibold">DVT Protocols</h3>
                <p className="text-center">(SSV, Obol)</p>
              </div>
            </div>

            <p className="text-gray-800 mt-8 text-center text-lg font-medium">
              Your Ethereum is staked using Lido, the largest liquid staking protocol,
              that provides optimised returns, security and decentralization
            </p>
          </div>
        </section>
        <footer className="bg-primary py-4">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-8">
            {/* Logo */}
            <div className="flex items-center">
              <img src="/logo.png" alt="LIS Logo" className="size-12" />
            </div>

            {/* Copyright */}
            <div className="text-white">Copyright © LIS 2024</div>

            {/* Email Icon */}
            <div className="flex items-center">
              <button className="rounded-full bg-white p-2" aria-label="Contact us">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </footer>
      </div>
    </MainPageLayout>
  )
}

export default StakingPage
