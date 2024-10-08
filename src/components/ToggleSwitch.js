import styled from 'styled-components'
import React from 'react'

const StyledToggleSwitch = styled.div`

	.toggle {
		display: flex;
		cursor: pointer;
		margin-top: 7px;
	}

	.toggle-switch {
		background: #ccc;
		border-radius: 16px;
		width: 58px;
		height: 32px;
		position: relative;
		vertical-align: middle;
		transition: background 0.25s;
	}

	.toggle-switch:before, .toggle-switch:after {
		content: "";
	}

	.toggle-switch:before {
		display: block;
		background: linear-gradient(to bottom, #fff 0%, #eee 100%);
		border-radius: 50%;
		box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
		width: 24px;
		height: 24px;
		position: absolute;
		top: 4px;
		left: 4px;
		transition: left 0.25s;
	}

	.toggle:hover .toggle-switch:before {
		background: linear-gradient(to bottom, #fff 0%, #fff 100%);
		box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
	}

	.toggle-checkbox:checked + .toggle-switch {
		background: #56c080;
	}
	.toggle-checkbox:checked + .toggle-switch:before {
		left: 30px;
	}

	.toggle-checkbox {
		position: absolute;
		visibility: hidden;
	}
`

function ToggleSwitch({ name, checked, handleChange }) {
  return (
    <StyledToggleSwitch>
        <label className="toggle">
			<input 
                className="toggle-checkbox" 
                type="checkbox"
                name={name} 
                checked={checked}
                onChange={handleChange}
                />
			<div className="toggle-switch"></div>
        </label>
    </StyledToggleSwitch>
  )
}

export default ToggleSwitch