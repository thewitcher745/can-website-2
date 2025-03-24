import styled from '@emotion/styled';
import { colors } from 'parameters';

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${colors.offwhite};
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
  color: ${colors.offwhite};
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
  
  &:focus {
    outline: none;
    border-color: ${colors.primaryHighlight};
    box-shadow: 0 0 0 3px rgba(254, 154, 0, 0.1);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
  color: ${colors.offwhite};
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
  min-height: 120px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${colors.primaryHighlight};
    box-shadow: 0 0 0 3px rgba(254, 154, 0, 0.1);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
  color: ${colors.offwhite};
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23FE9A00' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  
  &:focus {
    outline: none;
    border-color: ${colors.primaryHighlight};
    box-shadow: 0 0 0 3px rgba(254, 154, 0, 0.1);
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
`;

export const Checkbox = styled.input`
  margin-right: 0.5rem;
  cursor: pointer;
  
  &:checked {
    accent-color: ${colors.primaryHighlight};
  }
`;

export const CheckboxLabel = styled.label`
  color: ${colors.body};
  cursor: pointer;
`;

export const RadioGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
`;

export const Radio = styled.input`
  margin-right: 0.5rem;
  cursor: pointer;
  
  &:checked {
    accent-color: ${colors.primaryHighlight};
  }
`;

export const RadioLabel = styled.label`
  color: ${colors.body};
  cursor: pointer;
`;

export const FormError = styled.div`
  color: #ff4c4c;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

export const FormSuccess = styled.div`
  color: #2ecc71;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`; 