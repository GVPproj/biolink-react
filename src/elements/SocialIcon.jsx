import * as Tooltip from "@radix-ui/react-tooltip"
import "../css/tooltip.css"

function SocialIcon(props) {
  return (
    <a href={props.href} target="_blank">
      <Tooltip.Provider delayDuration={200}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            {
              <img
                className="social-svg"
                src={props.icon}
                alt={props.siteName}
              ></img>
            }
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
