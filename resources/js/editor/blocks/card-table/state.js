import { MAX_COLS, MAX_ROWS, createCell, createColumn } from "./defaults";
import { clone } from "./utils";

function moveItem(list, from, to) {
    if (to < 0 || to >= list.length || from === to) return false;
    list.splice(to, 0, list.splice(from, 1)[0]);
    return true;
}

export function addColumn(data) {
    if (data.columns.length >= MAX_COLS) return false;
    data.columns.push(createColumn(data.columns.length));
    data.rows.forEach((row) => row.push(createCell()));
    return true;
}

export function removeColumn(data, index) {
    if (data.columns.length <= 1) return false;
    data.columns.splice(index, 1);
    data.rows.forEach((row) => row.splice(index, 1));
    return true;
}

export function moveColumn(data, index, offset) {
    const target = index + offset;
    if (!moveItem(data.columns, index, target)) return false;
    data.rows.forEach((row) => moveItem(row, index, target));
    return true;
}

export function addRow(data) {
    if (data.rows.length >= MAX_ROWS) return false;
    data.rows.push(data.columns.map(() => createCell()));
    return true;
}

export function duplicateRow(data, index) {
    if (data.rows.length >= MAX_ROWS) return false;
    data.rows.splice(index + 1, 0, clone(data.rows[index]));
    return true;
}

export function removeRow(data, index) {
    if (data.rows.length <= 1) return false;
    data.rows.splice(index, 1);
    return true;
}

export function moveRow(data, index, offset) {
    return moveItem(data.rows, index, index + offset);
}