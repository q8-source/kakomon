import { FC } from 'react'
import './FilterPanel.css'

interface FilterPanelProps {
  years: number[]
  subjects: string[]
  selectedYear: string
  selectedSubject: string
  onFilterChange: (year: string, subject: string) => void
}

const FilterPanel: FC<FilterPanelProps> = ({
  years,
  subjects,
  selectedYear,
  selectedSubject,
  onFilterChange
}) => {
  return (
    <div className="filter-panel">
      <h2>フィルター</h2>
      <div className="filters">
        <div className="filter-group">
          <label htmlFor="year-filter">年度:</label>
          <select
            id="year-filter"
            value={selectedYear}
            onChange={(e) => onFilterChange(e.target.value, selectedSubject)}
          >
            <option value="">すべて</option>
            {years.map(year => (
              <option key={year} value={year}>{year}年</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="subject-filter">科目:</label>
          <select
            id="subject-filter"
            value={selectedSubject}
            onChange={(e) => onFilterChange(selectedYear, e.target.value)}
          >
            <option value="">すべて</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>

        {(selectedYear || selectedSubject) && (
          <button
            className="clear-filters"
            onClick={() => onFilterChange('', '')}
          >
            フィルターをクリア
          </button>
        )}
      </div>
    </div>
  )
}

export default FilterPanel
