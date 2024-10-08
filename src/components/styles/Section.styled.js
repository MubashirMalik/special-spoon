import styled from "styled-components";

export const Title = styled.div`
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 30px;
`

export const Subtitle = styled.div`
    font-weight: 600;
    line-height: 12px;
    padding-top: 20px;
`

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 14px;
    font-weight: 500;
    row-gap: 10px;
    width: 100%;

    label > sup {
        color: #ff6c5f;
    }
`

export const FlexRow = styled.div`
    display: flex;
    column-gap: 20px;
    margin-top: 20px;
`

export const SkillItem = styled.div`
    display: flex;
	column-gap: 10px;
	align-items: flex-end;
	font-weight: 600;
    line-height: 1em;
	background-color: var(--btn-green);
	color: #ffffff;
	border-radius: 0.2357rem;
	border: none;
	padding: 10px 10px;
    font-size: 13.33px;
	cursor: pointer;

`

export const Error = styled.div`
    color: #ef4b62;
    font-size: 14px;
    text-align: center;
`