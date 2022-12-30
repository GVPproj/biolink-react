import * as Tooltip from "@radix-ui/react-tooltip"
import "../css/tooltip.css"

function SocialIcon(props) {
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <a href={props.href} target="_blank">
            {
              <img
                className="social-svg"
                src={props.icon}
                alt={props.siteName}
              ></img>
            }
          </a>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="TooltipContent" sideOffset={5}>
            {props.siteName}
            <Tooltip.Arrow className="TooltipArrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}

export default SocialIcon
