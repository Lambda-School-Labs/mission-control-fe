import React, { useContext, useCallback } from 'react';
import { Button } from 'semantic-ui-react';
import { useMutation } from 'urql';
import { CREATE_LABEL as createLabel } from '../../Project/Queries/index';

import { LabelContext } from '../../../contexts/LabelContext';
import { labelPreviewDesign } from './CreateLabel.module.scss';
import CustomCirclePicker from '../StatusLabel/ColorPicker/CustomColorPicker';

const CreateLabelForm = ({ column }) => {
  const { label, setLabel } = useContext(LabelContext);
  const [, executeCreate] = useMutation(createLabel);
  const handleChanges = e => {
    e.preventDefault();
    setLabel({
      ...label,
      [e.target.name]: e.target.value,
      id: column.id,
    });
  };

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      executeCreate(label);
    },
    [executeCreate, label]
  );

  const disableTer = !label.color || !label.name;

  return (
    <form>
      <div>
        <div>
          <label>
            Label Name:
            <input
              name="name"
              id="name"
              placeholder="label..."
              onChange={handleChanges}
              value={label.name}
            />
          </label>
          <br />
          {label.name && label.color ? (
            <div
              className={labelPreviewDesign}
              style={{ background: `${label.color}` }}
            >
              {label.name}
            </div>
          ) : (
            ''
          )}
        </div>
        <CustomCirclePicker label={label} setLabel={setLabel} />
      </div>
      <div>
        <Button content="Save" onClick={handleSubmit} disabled={disableTer} />
      </div>
    </form>
  );
};

export default CreateLabelForm;
