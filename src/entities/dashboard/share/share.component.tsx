import { FC } from 'react'
import { Button } from '@shared/ui/button'
import { IconComponent } from '@shared/ui/icon'
import { CopyButton, ActionIcon, Tooltip } from '@mantine/core'

type Props = {
  percent: number
  ngo: string
}

export const Share: FC<Props> = ({ ngo, percent }) => {
  const text = `I am impact staking on LIS, donating ${percent}% of my rewards to ${ngo}`
  const textForX = `I am impact staking on @impactstake, donating ${percent}% of my rewards to ${ngo} https://impactstake.com/`
  const shareUrl = encodeURIComponent('https://dev.impactstake.com/social-impact/')

  const links = [
    {
      name: 'x',
      link: `https://twitter.com/intent/tweet?text=${encodeURIComponent(textForX)}`,
    },
    {
      name: 'linkedIn',
      link: `https://www.linkedin.com/shareArticle?url=${shareUrl}`,
    },
    {
      name: 'warpcast',
      link: ` https://warpcast.com/~/compose?text=${text}`,
    },
     {
      name: 'facebook',
      link: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    },
  ]

  const onShareClick = (link: string, name: string) => {
    if (name === 'linkedIn' || 'facebook') {
      navigator.clipboard.writeText(text)
    }

    window.open(link, '_blank')
  }

  return (
    <div>
      <h3 className="pb-10 text-2xl font-bold">Share your Impact</h3>
        <p className="flex flex-row items-center bg-[#eee] text-black rounded-lg p-4 mb-5">{text}
        <CopyButton value={text} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
              <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick= {
                copy
              }>
            {copied ? (
                <IconComponent name={'copy'} />
            ) : (
               <IconComponent name={'copy'} />
            )}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
        </p>
      <div className="flex gap-5 items-center justify-center">
        {links.map(({ name, link }) => (
          <Button
            key={name}
            name={name}
            className="btn"
            onClick={() => onShareClick(link, name)}
          >
            <IconComponent name={(name as 'x') || 'linkedIn' || 'warpcast' || 'facebook'} />
          </Button>
        ))}
      </div>
    </div>
  )
}
