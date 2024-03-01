// SPDX-FileCopyrightText: 2024 The Aalto Grades Developers
//
// SPDX-License-Identifier: MIT

import {useContext, useEffect, useState} from 'react';
import {Handle, NodeProps, Position} from 'reactflow';
import 'reactflow/dist/style.css';

import {
  CustomNodeTypes,
  StepperNodeSettings,
  StepperNodeValue,
} from '@common/types/graph';
import {NodeDataContext, NodeValuesContext} from '../../context/GraphProvider';
import BaseNode from './BaseNode';

type LocalSettings = {
  numSteps: number;
  outputValues: string[];
  middlePoints: string[];
};
const initialSettings = {
  numSteps: 1,
  middlePoints: [],
  outputValues: ['0'],
};

const checkError = (settings: LocalSettings): boolean => {
  for (const middleValue of settings.middlePoints) {
    if (!/^\d+(?:\.\d+?)?$/.test(middleValue)) return true;
  }
  for (const outputValue of settings.outputValues) {
    if (!/^\d+(?:\.\d+?)?$/.test(outputValue) && outputValue !== 'same')
      return true;
  }

  for (let i = 0; i < settings.numSteps - 1; i++) {
    if (
      i + 1 < settings.numSteps - 1 &&
      parseFloat(settings.middlePoints[i]) >=
        parseFloat(settings.middlePoints[i + 1])
    ) {
      return true;
    } else if (
      i > 0 &&
      parseFloat(settings.middlePoints[i]) <=
        parseFloat(settings.middlePoints[i - 1])
    ) {
      return true;
    }
  }
  return false;
};

const StepperNode = ({id, type, isConnectable}: NodeProps) => {
  const {nodeValues} = useContext(NodeValuesContext);
  const {nodeData, setNodeSettings} = useContext(NodeDataContext);
  const [localSettings, setLocalSettings] = useState<LocalSettings>(
    JSON.parse(JSON.stringify(initialSettings))
  );
  const [error, setError] = useState<boolean>(false);
  const [init, setInit] = useState<boolean>(false);

  const nodeValue = nodeValues[id] as StepperNodeValue;
  const settings = nodeData[id].settings as StepperNodeSettings;

  useEffect(() => {
    if (init) return;
    setLocalSettings({
      numSteps: settings.numSteps,
      middlePoints: settings.middlePoints.map(val => val.toString()),
      outputValues: settings.outputValues.map(val => val.toString()),
    });
    setInit(true);
    setError(false);
  }, [nodeData]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (
    type: 'middlepoint' | 'outputvalue',
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newLocalSettings = {...localSettings};
    if (type === 'middlepoint') {
      newLocalSettings.middlePoints[index] = event.target.value;
    } else {
      newLocalSettings.outputValues[index] = event.target.value;
    }
    setLocalSettings(newLocalSettings);

    if (checkError(newLocalSettings)) {
      setError(true);
      return;
    }
    setError(false);

    setLocalSettings(newLocalSettings);
    setNodeSettings(id, {
      numSteps: newLocalSettings.numSteps,
      middlePoints: newLocalSettings.middlePoints.map(val => parseFloat(val)),
      outputValues: newLocalSettings.outputValues.map(val =>
        val === 'same' ? 'same' : parseFloat(val)
      ),
    });
  };

  const handleAdd = () => {
    const newLocalSettings = {
      numSteps: localSettings.numSteps + 1,
      middlePoints: localSettings.middlePoints.concat(''),
      outputValues: localSettings.outputValues.concat(''),
    };
    setLocalSettings(newLocalSettings);
    setError(true);
  };

  const handleRemove = () => {
    const newLocalSettings = {...localSettings};
    newLocalSettings.numSteps -= 1;
    newLocalSettings.middlePoints.pop();
    newLocalSettings.outputValues.pop();
    setLocalSettings(newLocalSettings);

    if (checkError(newLocalSettings)) {
      setError(true);
      return;
    }
    setError(false);

    setNodeSettings(id, {
      numSteps: newLocalSettings.numSteps,
      middlePoints: newLocalSettings.middlePoints.map(val => parseFloat(val)),
      outputValues: newLocalSettings.outputValues.map(val =>
        val === 'same' ? 'same' : parseFloat(val)
      ),
    });
  };

  const isCurrentSlot = (index: number): boolean => {
    if (
      index > 0 &&
      nodeValue.source <= parseFloat(localSettings.middlePoints[index - 1])
    )
      return false;
    if (
      index < localSettings.numSteps - 1 &&
      nodeValue.source > parseFloat(localSettings.middlePoints[index])
    )
      return false;
    return true;
  };

  return (
    <BaseNode id={id} type={type as CustomNodeTypes} error={error}>
      <Handle
        type="target"
        id={id}
        style={{height: '12px', width: '12px'}}
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <table style={{width: '100%', margin: '5px 0px'}}>
        <tbody>
          <tr>
            <th>Range</th>
            <th>Output</th>
          </tr>
          {new Array(localSettings.numSteps).fill(0).map((_, index) => (
            <tr
              key={`${id}-${index}`}
              style={{
                background: !error && isCurrentSlot(index) ? '#00f6' : '',
              }}
            >
              <td>
                <p style={{display: 'inline'}}>≤ </p>
                {index + 1 === localSettings.numSteps ? (
                  <input
                    style={{width: '40px'}}
                    type="text"
                    value="∞"
                    disabled
                  />
                ) : (
                  <input
                    style={{width: '40px'}}
                    type="number"
                    value={localSettings.middlePoints[index]}
                    onChange={event =>
                      handleChange('middlepoint', index, event)
                    }
                  />
                )}
              </td>
              <td>
                <input
                  style={{width: '40px'}}
                  value={localSettings.outputValues[index]}
                  onChange={event => handleChange('outputvalue', index, event)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button style={{float: 'left', marginRight: '5px'}} onClick={handleAdd}>
        New row
      </button>
      <button
        style={{float: 'right'}}
        disabled={localSettings.numSteps === 1}
        onClick={handleRemove}
      >
        Remove row
      </button>
      <Handle
        type="source"
        id={`${id}-source`}
        style={{height: '12px', width: '12px'}}
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </BaseNode>
  );
};

export default StepperNode;