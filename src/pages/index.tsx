import React, { Component } from 'react';
import Link from 'umi/link';

export default function() {
  return <div>
    <li><Link to="/save_in_state">Go to save_in_state page</Link></li>
    <li><Link to="/save_in_mock">Go to save_in_mock page</Link></li>
  </div>;
};
