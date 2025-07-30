import {query} from "express-validator";
import {paginationAndSortingDefault} from "./query-default-pagination";
import {SortDirection} from "../types/sort-direction";

export function paginationAndSortingValidation<T extends string>(
    sortFieldsEnum: Record<string, T>,
) {
    const allowedSortFields = Object.values(sortFieldsEnum);

    return [
        query('pageNumber')
            .optional()
            .default(paginationAndSortingDefault.pageNumber)
            .isInt({ min: 1 })
            .withMessage('Page number must be a positive integer')
            .toInt(),

        query('pageSize')
            .optional()
            .default(paginationAndSortingDefault.pageSize)
            .isInt({ min: 1, max: 100 })
            .withMessage('Page size must be between 1 and 100')
            .toInt(),

        query('sortBy')
            .optional()
            .default(Object.values(sortFieldsEnum)[0]) // Первое значение enum как дефолтное
            .isIn(allowedSortFields)
            .withMessage(
                `Invalid sort field. Allowed values: ${allowedSortFields.join(', ')}`,
            ),

        query('sortDirection')
            .optional()
            .default(paginationAndSortingDefault.sortDirection)
            .isIn(Object.values(SortDirection))
            .withMessage(
                `Sort direction must be one of: ${Object.values(SortDirection).join(', ')}`,
            ),
    ];
}