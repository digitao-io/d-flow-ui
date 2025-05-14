<template>
  <label class="d-time-picker">
    <div class="d-time-picker__label">
      {{ props.label }}
    </div>
    <div class="d-time-picker__container">
      <input
        class="d-time-picker__input"
        type="text"
        :placeholder="props.placeholder"
        :value="displayedValue"
        @keyup.backspace="onClear"
        @keydown.prevent
        @focus="onInputFocus"
      >
      <button
        class="d-time-picker__button"
        type="button"
        @click.stop.prevent="toggleDropdown"
      >
        <font-awesome-icon
          v-if="!showDropdown"
          :icon="faAngleDown"
        />
        <font-awesome-icon
          v-else
          :icon="faAngleUp"
        />
      </button>

      <div
        v-if="showDropdown"
        class="d-time-picker__dropdown-modal"
        @click.stop.prevent="toggleDropdown"
      />

      <div
        v-if="showDropdown"
        class="d-time-picker__dropdown-area"
      >
        <div class="d-time-picker__section">
          <div class="d-time-picker__selectable-row">
            <button
              class="d-time-picker__row-scoller"
              type="button"
              @click.stop.prevent="onPreviousYears"
            >
              <font-awesome-icon
                :icon="faCircleArrowLeft"
              />
            </button>

            <button
              v-for="selectableYear of years"
              :key="selectableYear"
              class="d-time-picker__row-select"
              :class="{
                'd-time-picker__row-select--selected': currentYear === selectableYear,
              }"
              type="button"
              @click.stop.prevent="onSelectYear(selectableYear)"
            >
              {{ selectableYear }}
            </button>

            <button
              class="d-time-picker__row-scoller"
              type="button"
              @click.stop.prevent="onNextYears"
            >
              <font-awesome-icon
                :icon="faCircleArrowRight"
              />
            </button>
          </div>
        </div>

        <div class="d-time-picker__section">
          <div class="d-time-picker__selectable-row">
            <button
              class="d-time-picker__row-scoller"
              type="button"
              @click.stop.prevent="onPreviousMonths"
            >
              <font-awesome-icon
                :icon="faCircleArrowLeft"
              />
            </button>

            <button
              v-for="selectableMonth of months"
              :key="selectableMonth"
              class="d-time-picker__row-select"
              :class="{
                'd-time-picker__row-select--selected': currentMonth === selectableMonth,
              }"
              type="button"
              @click.stop.prevent="onSelectMonth(selectableMonth)"
            >
              {{ formatMonth(selectableMonth) }}
            </button>

            <button
              class="d-time-picker__row-scoller"
              type="button"
              @click.stop.prevent="onNextMonths"
            >
              <font-awesome-icon
                :icon="faCircleArrowRight"
              />
            </button>
          </div>
        </div>

        <div
          v-if="props.type === 'day' || props.type === 'minute'"
          class="d-time-picker__section"
        >
          <div class="d-time-picker__calendar">
            <div class="d-time-picker__calendar-head">
              <span
                v-for="weekdayName of weekdayNames"
                :key="weekdayName"
                class="d-time-picker__calendar-weekday-name"
              >
                {{ weekdayName }}
              </span>
            </div>

            <div
              v-for="(week, weekIndex) of weeks"
              :key="`week-${weekIndex}`"
              class="d-time-picker__calendar-week"
            >
              <template
                v-for="(selectableDay, dayIndex) of week"
                :key="`week-${weekIndex}-day-${dayIndex}`"
              >
                <span
                  v-if="selectableDay === null"
                  class="d-time-picker__calendar-empty-day"
                >
                  &nbsp;
                </span>
                <button
                  v-else
                  class="d-time-picker__calendar-day"
                  :class="{
                    'd-time-picker__calendar-day--selected': currentDay === selectableDay,
                  }"
                  @click.stop.prevent="onSelectDay(selectableDay)"
                >
                  {{ selectableDay }}
                </button>
              </template>
            </div>
          </div>
        </div>

        <div
          v-if="props.type === 'time'"
          class="d-time-picker__section"
        >
          <div class="d-time-picker__time-input-area">
            <input
              v-model="currentHour"
              class="d-time-picker__hour-min-input"
              type="text"
              inputmode="numeric"
              pattern="[0-9]*"
            >
            <span class="d-time-picker__hour-min-hint">:</span>
            <input
              v-model="currentMinute"
              class="d-time-picker__hour-min-input"
              type="text"
              inputmode="numeric"
              pattern="[0-9]*"
            >
            <div
              v-if="!props.format.use24HourTime"
              class="d-time-picker__meridiem-selector"
            >
              <button
                class="d-time-picker__meridiem-button"
                :class="{
                  'd-time-picker__meridiem-button--selected': currentMeridiem === 'AM',
                }"
                type="button"
                @click.stop.prevent="onSelectMeridiem('AM')"
              >AM</button>
              <button
                class="d-time-picker__meridiem-button"
                :class="{
                  'd-time-picker__meridiem-button--selected': currentMeridiem === 'PM',
                }"
                type="button"
                @click.stop.prevent="onSelectMeridiem('PM')"
              >PM</button>
            </div>
          </div>
        </div>

        <div class="d-time-picker__action">
          <d-button
            class="d-time-picker__action-button"
            @click.stop.prevent="onSubmit"
          >
            {{ props.submitButtonLabel }}
          </d-button>

          <d-button
            class="d-time-picker__action-button"
            secondary
            @click.stop.prevent="onClear"
          >
            {{ props.clearButtonLabel }}
          </d-button>
        </div>
      </div>
    </div>
    <div
      v-if="props.errorMessage"
      class="d-time-picker__error-message"
    >
      {{ props.errorMessage }}
    </div>
  </label>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { DateTime } from "luxon";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { DButton } from "../d-button";

export interface DTimePickerFormat {
  display: string;
  firstWeekday?: "sunday" | "monday";
  use24HourTime?: boolean;
}

const props = defineProps<{
  label: string;
  submitButtonLabel?: string;
  clearButtonLabel?: string;
  type: "minute" | "day" | "month";
  format: DTimePickerFormat;
  locale: string;
  timeZone: string;
  numberOfYears: number;
  numberOfMonths: number;
  placeholder?: string;
  errorMessage?: string;
}>();

const emit = defineEmits<{
  "update": [string];
}>();

const model = defineModel<string>();

const internalValue = computed<DateTime>({
  get: () => model.value
    ? DateTime.fromISO(model.value).setLocale(props.locale).setZone(props.timeZone)
    : DateTime.now().setLocale(props.locale).setZone(props.timeZone),
  set: (value) => {
    model.value = (value
      ? (value
          .setZone(props.timeZone)
          .startOf(props.type)
          .toUTC()
          .toISO() ?? "")
      : "");
  },
});

const displayedValue = computed<string>(
  () => model.value ? internalValue.value.toFormat(props.format.display) : "",
);

const currentYear = computed<number>(() => internalValue.value.year);

const years = computed<number[]>(() => {
  const results = [];
  for (
    let i = currentYear.value - Math.round((props.numberOfYears + 0.5) / 2);
    i < currentYear.value + Math.round((props.numberOfYears - 0.5) / 2);
    i++
  ) {
    results.push(i);
  }

  return results;
});

function onPreviousYears() {
  internalValue.value = internalValue.value.minus({ years: props.numberOfYears });
}

function onNextYears() {
  internalValue.value = internalValue.value.plus({ years: props.numberOfYears });
}

function onSelectYear(year: number) {
  internalValue.value = internalValue.value.set({ year });
}

const currentMonth = computed<number>(() => internalValue.value.month);

const months = computed<number[]>(() => {
  const results = [];
  let lowerBound = currentMonth.value - Math.round((props.numberOfMonths + 0.5) / 2);
  let upperBound = currentMonth.value + Math.round((props.numberOfMonths - 0.5) / 2) - 1;

  if (lowerBound < 1) {
    upperBound += 1 - lowerBound;
    lowerBound = 1;
  }
  else if (upperBound > 12) {
    lowerBound -= upperBound - 12;
    upperBound = 12;
  }

  for (let i = lowerBound; i <= upperBound; i++) {
    results.push(i);
  }

  return results;
});

function onPreviousMonths() {
  const monthsToSubstract = currentMonth.value - props.numberOfMonths >= 1
    ? props.numberOfMonths
    : currentMonth.value - 1;
  internalValue.value = internalValue.value.minus({ months: monthsToSubstract });
}

function onNextMonths() {
  const monthsToAdd = currentMonth.value + props.numberOfMonths <= 12
    ? props.numberOfMonths
    : 12 - currentMonth.value;
  internalValue.value = internalValue.value.plus({ months: monthsToAdd });
}

function onSelectMonth(month: number) {
  internalValue.value = internalValue.value.set({ month });
}

function formatMonth(month: number) {
  return DateTime.fromObject({ month }).setLocale(props.locale).toFormat("MMM");
}

const currentDay = computed<number>(() => internalValue.value.day);

const weeks = computed<Array<Array<number | null>>>(() => {
  const startOfMonth = internalValue.value.startOf("month");
  let start = startOfMonth.startOf("week");
  if (props.format.firstWeekday === "sunday") {
    start = start.minus({ day: 1 });
  }
  const endOfMonth = internalValue.value.endOf("month");
  let end = endOfMonth.endOf("week");
  if (props.format.firstWeekday === "sunday") {
    end = end.minus({ day: 1 });
  }

  const results = [];
  let currentWeek: Array<number | null> = [];

  for (
    let currentDay = start;
    currentDay.toMillis() < end.toMillis();
    currentDay = currentDay.plus({ day: 1 })
  ) {
    if (currentDay.toMillis() < startOfMonth.toMillis() || currentDay.toMillis() > endOfMonth.toMillis()) {
      currentWeek.push(null);
    }
    else {
      currentWeek.push(currentDay.day);
    }

    if (currentWeek.length === 7) {
      results.push(currentWeek);
      currentWeek = [];
    }
  }

  return results;
});

const weekdayNames = computed<string[]>(() => {
  const start = DateTime.now()
    .setLocale(props.locale)
    .setZone(props.timeZone)
    .set({ weekday: props.format.firstWeekday === "sunday" ? 7 : 1 });
  const results = [];

  for (let i = 0; i < 7; i++) {
    results.push(start.plus({ day: i }).toFormat("EEE"));
  }

  return results;
});

function onSelectDay(day: number) {
  internalValue.value = internalValue.value.set({ day });
}

const showDropdown = ref<boolean>(false);

const currentHour = computed<string>({
  get: () => {
    if (props.format.use24HourTime) {
      return String(internalValue.value.hour).padStart(2, "0");
    }
    else {
      const value = internalValue.value.hour % 12;
      return String(value !== 0 ? value : 12).padStart(2, "0");
    }
  },
  set: (value: string) => {
    let hour = Number(value);

    if (props.format.use24HourTime) {
      if (hour > 23) {
        hour = 23;
      }
      else if (hour < 0) {
        hour = 0;
      }
    }
    else {
      if (hour > 12) {
        hour = 12;
      }
      else if (hour < 1) {
        hour = 1;
      }

      hour += (currentMeridiem.value === "PM" && hour < 12) ? 12 : 0;
    }

    internalValue.value = internalValue.value.set({ hour });
  },
});

const currentMinute = computed<string>({
  get: () => String(internalValue.value.minute).padStart(2, "0"),
  set: (value: string) => {
    let minute = Number(value);
    if (minute > 59) {
      minute = 59;
    }
    else if (minute < 0) {
      minute = 0;
    }

    internalValue.value = internalValue.value.set({ minute });
  },
});

const currentMeridiem = computed<"AM" | "PM">(() => internalValue.value.hour < 12 ? "AM" : "PM");

function onSelectMeridiem(meridiem: "AM" | "PM") {
  let hour = internalValue.value.hour;
  if (hour < 12 && meridiem === "PM") {
    hour += 12;
  }
  else if (hour >= 12 && meridiem === "AM") {
    hour -= 12;
  }
  internalValue.value = internalValue.value.set({ hour });
}

function onInputFocus() {
  if (!showDropdown.value) {
    showDropdown.value = true;
  }
}

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
};

function onSubmit() {
  showDropdown.value = false;
  emit("update", internalValue.value
    .setZone(props.timeZone)
    .startOf(props.type)
    .toUTC()
    .toISO() ?? ""!);
}

function onClear() {
  model.value = "";
  emit("update", "");
}
</script>

<style scoped lang="scss">
.d-time-picker {
  display: block;

  &__label {
    @include tokens.typography-text-s--bold;
    color: tokens.$color-flavor1;
  }

  &__container {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
  }

  &__input {
    flex: 1 1;
    height: tokens.$input-size;
    padding-left: tokens.$space-s;
    padding-right: tokens.$space-s;
    border: none;
    border-bottom: 2px solid tokens.$color-flavor1;
    @include tokens.typography-text--medium;
    background-color: tokens.$color-flavor1l-t1;

    &::placeholder {
      color: tokens.$color-neutral-g;
    }

    &:focus,
    &:active {
      outline: none;
      color: tokens.$color-neutral-b;
      border-bottom-color: tokens.$color-flavor1;
      background-color: tokens.$color-flavor1l;
    }
  }

  &__button {
    @include tokens.round-edged-block;
    @include tokens.typography-text--medium;
    border: none;
    height: tokens.$input-size;
    width: tokens.$input-size;
    background-color: tokens.$color-flavor1;
    color: white;
    cursor: pointer;
  }

  &__dropdown-modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  &__dropdown-area {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1;
    padding: tokens.$space-m;
    background-color: tokens.$color-flavor1l-t2;
  }

  &__section {
    margin-bottom: tokens.$space-m;
  }

  &__selectable-row {
    display: flex;
    justify-content: space-between;
  }

  &__row-scoller {
    @include tokens.typography-text-l;
    margin: 0;
    border: none;
    padding: 0;
    color: tokens.$color-flavor1;
    background-color: transparent;
    cursor: pointer;

    &:hover {
      color: tokens.$color-flavor1-t1;
    }
  }

  &__row-select {
    @include tokens.typography-text-s--bold;
    @include tokens.round-edged-block;
    margin: 0;
    border: none;
    padding: 0 tokens.$space-s;
    background-color: transparent;
    color: tokens.$color-neutral-b;
    cursor: pointer;

    &--selected {
      background-color: tokens.$color-flavor1;
      color: tokens.$color-neutral-w;
    }

    &:hover {
      background-color: tokens.$color-flavor1-t1;
      color: tokens.$color-neutral-w;
    }
  }

  &__calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-auto-rows: auto;
    justify-items: stretch;
    text-align: center;
    color: tokens.$color-neutral-b;
  }

  &__calendar-head,
  &__calendar-week {
    display: contents;
  }

  &__calendar-weekday-name {
    @include tokens.typography-text-s--bold;
    color: tokens.$color-neutral-b-t1;
    line-height: tokens.$input-size-s;
  }

  &__calendar-day {
    @include tokens.typography-text-s--bold;
    @include tokens.round-edged-block;
    margin: 0;
    border: none;
    padding: 0 tokens.$space-s;
    line-height: tokens.$input-size-s;
    background-color: transparent;
    color: tokens.$color-neutral-b;
    cursor: pointer;

    &--selected {
      background-color: tokens.$color-flavor1;
      color: tokens.$color-neutral-w;
    }

    &:hover {
      background-color: tokens.$color-flavor1-t1;
      color: tokens.$color-neutral-w;
    }
  }

  &__time-input-area {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__hour-min-input {
    @include tokens.typography-title-xl;
    @include tokens.round-edged-block;
    width: 3ch;
    border: none;
    outline: none;
    text-align: center;
    background-color: transparent;
    color: tokens.$color-neutral-b;

    &:focus,
    &:active {
      color: tokens.$color-neutral-w;
      border-bottom-color: tokens.$color-flavor1;
      background-color: tokens.$color-flavor1;
    }
  }

  &__hour-min-hint {
    @include tokens.typography-title;
    color: tokens.$color-flavor1;
  }

  &__meridiem-selector {
    display: flex;
    flex-direction: column;
    margin-left: tokens.$space-m;
  }

  &__meridiem-button {
    @include tokens.typography-text-s--bold;
    @include tokens.round-edged-block;
    margin: 1px;
    border: none;
    padding: 0 tokens.$space-m;
    background-color: transparent;
    color: tokens.$color-neutral-b;
    cursor: pointer;

    &--selected {
      background-color: tokens.$color-flavor1;
      color: tokens.$color-neutral-w;
    }

    &:hover {
      background-color: tokens.$color-flavor1-t1;
      color: tokens.$color-neutral-w;
    }
  }

  &__action {
    display: flex;
    gap: tokens.$space-s;
    justify-content: center;
  }

  &__error-message {
    @include tokens.typography-text-s;
    color: tokens.$color-error;
  }
}
</style>
