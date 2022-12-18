import * as Tooltip from "@radix-ui/react-tooltip"

function SocialIcon(props) {
  return (
    <a href={props.href}>
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          {<img className="social-icon" src={props.icon} alt={props.siteName}></img>}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="TooltipContent" sideOffset={5}>
            {props.siteName}
            <Tooltip.Arrow className="TooltipArrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
    </a>
  )
}

export default SocialIcon
