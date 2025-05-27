'use strict';

const { fillTank } = require('./fillTank');

describe('fillTank', () => {
  test('fills full tank if enough money and no amount specified', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40, fuelRemains: 8,
      },
    };

    fillTank(customer, 50);
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(1400);
  });

  test('fills requested amount if affordable and fits', () => {
    const customer = {
      money: 500,
      vehicle: {
        maxTankCapacity: 50, fuelRemains: 10,
      },
    };

    fillTank(customer, 20, 5);
    expect(customer.vehicle.fuelRemains).toBe(15);
    expect(customer.money).toBe(400);
  });

  test('fills only what fits in the tank', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 40, fuelRemains: 36,
      },
    };

    fillTank(customer, 10, 10);
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(960);
  });

  test('fills only what customer can afford', () => {
    const customer = {
      money: 20,
      vehicle: {
        maxTankCapacity: 50, fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 5);
    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBe(0);
  });

  test('rounds fuel down to 0.1L', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 20, fuelRemains: 10,
      },
    };

    fillTank(customer, 10, 5.57); // rounds to 5.5
    expect(customer.vehicle.fuelRemains).toBe(15.5);
    expect(customer.money).toBe(45);
  });

  test('rounds price to 2 decimals', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 20, fuelRemains: 0,
      },
    };

    fillTank(customer, 3.333, 10);
    expect(customer.vehicle.fuelRemains).toBe(10);
    expect(customer.money).toBeCloseTo(66.67, 0.01);
  });

  test('does not fill if amount < 2L after rounding', () => {
    const customer = {
      money: 100,
      vehicle: {
        maxTankCapacity: 20, fuelRemains: 19,
      },
    };

    fillTank(customer, 10, 1.9); // 1.9 < 2
    expect(customer.vehicle.fuelRemains).toBe(19);
    expect(customer.money).toBe(100);
  });
});
