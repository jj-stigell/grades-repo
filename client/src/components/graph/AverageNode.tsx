// SPDX-FileCopyrightText: 2024 The Aalto Grades Developers
//
// SPDX-License-Identifier: MIT

import {useContext, useEffect, useState} from 'react';
import {Handle, NodeProps, Position, useUpdateNodeInternals} from 'reactflow';
import 'reactflow/dist/style.css';

import {
  AverageNodeSettings,
  AverageNodeValue,
  CustomNodeTypes,
} from '@common/types/graph';
import {NodeDataContext, NodeValuesContext} from '../../context/GraphProvider';
import BaseNode from './BaseNode';

type LocalSettings = {weights: {[key: string]: string}};

const handleStartHeight = 83;
const rowHeight = 33.9;

const convertSettingsToFloats = (
  settings: LocalSettings
): AverageNodeSettings => {
  const nodeSettings: AverageNodeSettings = {weights: {}};
  for (const [key, value] of Object.entries(settings.weights))
    nodeSettings.weights[key] = parseFloat(value);
  return nodeSettings;
};
const convertSettingsToStrings = (
  settings: AverageNodeSettings
): LocalSettings => {
  const nodeSettings: LocalSettings = {weights: {}};
  for (const [key, value] of Object.entries(settings.weights))
    nodeSettings.weights[key] = value.toString();
  return nodeSettings;
};
const checkError = (settings: LocalSettings): boolean => {
  for (const weight of Object.values(settings.weights)) {
    if (!/^\d+(?:\.\d+?)?$/.test(weight)) return true;
  }
  return false;
};

const AverageNode = ({id, type, isConnectable}: NodeProps) => {
  const updateNodeInternals = useUpdateNodeInternals();
  const {nodeData, setNodeSettings} = useContext(NodeDataContext);
  const {nodeValues} = useContext(NodeValuesContext);

  const [localSettings, setLocalSettings] = useState<LocalSettings>({
    weights: {},
  });

  const [handles, setHandles] = useState<string[]>([]);
  const [nextFree, setNextFree] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const [init, setInit] = useState<boolean>(false);

  const nodeValue = nodeValues[id] as AverageNodeValue;
  const settings = nodeData[id].settings as AverageNodeSettings;

  useEffect(() => {
    if (init) return;
    const initSettings = settings;
    setLocalSettings(convertSettingsToStrings(initSettings));
    setError(false);
    setInit(true);
  }, [nodeData]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!init) return;
    let change = false;
    let maxId = 0;
    let newHandles = [...handles];
    const newLocalSettings = {...localSettings};
    for (const [key, source] of Object.entries(nodeValue.sources)) {
      maxId = Math.max(maxId, parseInt(key.split('-').at(-1) as string));
      if (!handles.includes(key)) {
        if (!(key in newLocalSettings.weights))
          newLocalSettings.weights[key] = '';
        newHandles.push(key);
        change = true;
      }
      if (!source.isConnected) {
        newHandles = newHandles.filter(handle => handle !== key);
        delete newLocalSettings.weights[key];
        change = true;
      }
    }
    if (change) {
      setTimeout(() => updateNodeInternals(id), 0);
      setHandles(newHandles);
      setLocalSettings(newLocalSettings);
      const error = checkError(newLocalSettings);
      setError(error);
      setNextFree(maxId + 1);
      if (!error) {
        setNodeSettings(id, convertSettingsToFloats(newLocalSettings));
      }
    }
  }, [nodeValues, init]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (
    key: string,
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newLocalSettings = {...localSettings};
    newLocalSettings.weights[key] = event.target.value;
    setLocalSettings(newLocalSettings);

    if (checkError(newLocalSettings)) {
      setError(true);
      return;
    }
    setError(false);

    setLocalSettings(newLocalSettings);
    setNodeSettings(id, convertSettingsToFloats(newLocalSettings));
  };

  const sources = nodeValue.sources;
  let weightSum = 0;
  for (const key of Object.keys(settings.weights)) {
    weightSum += settings.weights[key];
  }

  return (
    <BaseNode id={id} type={type as CustomNodeTypes} error={error}>
      {handles.map((key, index) => (
        <Handle
          key={`handle-${key}`}
          type="target"
          id={key}
          style={{
            height: '12px',
            width: '12px',
            top: `${handleStartHeight + index * rowHeight}px`,
          }}
          position={Position.Left}
          isConnectable={isConnectable}
        />
      ))}
      <Handle
        type="target"
        id={`${id}-${nextFree}`}
        style={{
          height: '12px',
          width: '12px',
          top: `${
            handleStartHeight +
            Object.keys(localSettings.weights).length * rowHeight
          }px`,
        }}
        position={Position.Left}
        isConnectable={isConnectable}
      />

      <table style={{width: '100%', margin: '5px 0px'}}>
        <tbody>
          <tr>
            <th>Weight</th>
            <th>value</th>
          </tr>
          {Object.entries(localSettings.weights).map(([key, weight]) => (
            <tr key={`tr-${id}-${key}`}>
              <td>
                <input
                  style={{width: '40px'}}
                  type="number"
                  value={weight}
                  onChange={event => handleChange(key, event)}
                />
              </td>
              <td>
                {!(key in sources) ||
                !(key in settings.weights) ||
                weightSum === 0
                  ? 0
                  : Math.round(
                      ((sources[key].value * settings.weights[key]) /
                        weightSum) *
                        100
                    ) / 100}
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input style={{width: '40px'}} type="number" disabled />
            </td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
      <p style={{margin: 0, display: 'inline'}}>
        {Math.round(nodeValue.value * 100) / 100}
      </p>
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

export default AverageNode;