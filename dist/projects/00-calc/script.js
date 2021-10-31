'use strict';

const squareInput = document.getElementById('square-input');
const squareRange = document.getElementById('square-range');
const inputs = document.querySelectorAll('input');

const typeReconstrEl = document.querySelectorAll('input[name="type"]');
const typeBuildingsEl = document.querySelectorAll('input[name="building"]');
const typeRoomsEl = document.querySelectorAll('input[name="rooms"]');

const ceilings = document.querySelector('input[name="ceiling"]');
const walls = document.querySelector('input[name="walls"]');
const floor = document.querySelector('input[name="floor"]');

const basePriceMeter = 6000;
const totalPriceEl = document.getElementById('total-price');


squareRange.addEventListener('input', () => {
    squareInput.value = squareRange.value;
});
squareInput.addEventListener('input', () => {
    squareRange.value = squareInput.value;
});

calculate();

inputs.forEach(function (item) {
    item.addEventListener('input', calculate);
});


function calculate() {
    const square = parseInt(squareInput.value);

    // Тип ремонта
    let typeReconstrCost;
    typeReconstrEl.forEach(function(item){
        if(item.checked) {
            typeReconstrCost = parseFloat(item.value);
        }
    });

    // Тип дома
    let typeBuildingCost;
    typeBuildingsEl.forEach(function(item){
        if(item.checked) {
            typeBuildingCost = parseFloat(item.value);
        }
    });

    // Количество комнат
    let typeRoomsCost;
    typeRoomsEl.forEach(function(item){
        if(item.checked) {
            typeRoomsCost = parseFloat(item.value);
        }
    });

    // Доп. опции
    const ceilingsCost = ceilings.checked ? parseFloat(ceilings.value) : 1;

    const wallsCost = walls.checked ? parseFloat(walls.value) : 1;
    const floorCost = floor.checked ? parseFloat(floor.value) : 1;

    const totalPrice = basePriceMeter * square * typeReconstrCost * 
        typeBuildingCost * typeRoomsCost * ceilingsCost * wallsCost * floorCost;

    const formatter = new Intl.NumberFormat('ru');

    totalPriceEl.innerText = formatter.format(totalPrice);
}