import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const ToneSelector = ({ selectedTone, setSelectedTone, toneColors }) => (
  <Menu as="div" className="relative inline-block text-left">
    <Menu.Button className="px-4 py-2 border rounded-md bg-white text-sm shadow">
      Mood: {selectedTone}
    </Menu.Button>
    <Transition as={Fragment}>
      <Menu.Items className="absolute mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
        <div className="py-1">
          {Object.entries(toneColors).map(([tone, color]) => (
            <Menu.Item key={tone}>
              <button
                onClick={() => setSelectedTone(tone)}
                className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
              >
                <span
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: color }}
                ></span>
                {tone}
              </button>
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Transition>
  </Menu>
);

export default ToneSelector;
