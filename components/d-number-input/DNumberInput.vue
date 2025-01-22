<template>
  <label class="d-number-input">
    <span class="d-number-input__label">
      {{ props.label }}
    </span>
    <div class="d-number-input__container">
      <div
        v-if="props.prefix"
        class="d-number-input__addon"
      >
        {{ props.prefix }}
      </div>
      <input
        ref="input"
        class="d-number-input__input"
        type="text"
        :inputmode="inputmode"
        :pattern="pattern"
        :placeholder="props.placeholder"
        @input="onInput"
        @blur="handleBlur"
      >
      <div
        v-if="props.suffix"
        class="d-number-input__addon"
      >
        {{ props.suffix }}
      </div>
    </div>
    <div
      v-if="props.errorMessage"
      class="d-number-input__error-message"
    >
      {{ props.errorMessage }}
    </div>
  </label>
</template>

<script setup lang="ts">
import { onMounted, useTemplateRef, watch } from "vue";
import { computed, ref } from "vue";

const props = defineProps<{
  label: string;
  decimalDigits?: number;
  decimalSeparator?: "." | ",";
  groupDigits?: number;
  groupSeparator?: "." | "," | "'";
  prefix?: string;
  suffix?: string;
  signed?: boolean;
  placeholder?: string;
  errorMessage?: string;
}>();

const emit = defineEmits<{
  update: [string];
}>();

const model = defineModel<string>();
const value = ref<string>("");

const inputElement = useTemplateRef("input");

watch(() => model.value, (newValue) => {
  value.value = newValue !== undefined ? fromNumberToString(newValue) : "";
  if (inputElement.value) {
    inputElement.value.value = value.value;
  }
});

watch(() => value.value, (newValue) => {
  model.value = newValue !== "" ? fromStringToNumber(newValue) : undefined;
});

onMounted(() => {
  value.value = model.value !== undefined ? fromNumberToString(model.value) : "";
  if (inputElement.value) {
    inputElement.value.value = value.value;
  }
});

const isDecimal = computed(() => props.decimalSeparator !== undefined);
const isFixedDecimal = computed(() => isDecimal.value && props.decimalDigits !== undefined && props.decimalDigits > 0);
const isGrouped = computed(() => props.groupSeparator !== undefined && props.groupDigits !== undefined && props.groupDigits > 0);

const inputmode = computed<"numeric" | "decimal">(() => props.decimalDigits === 0 ? "numeric" : "decimal");
const pattern = computed<string>(() => {
  let regExpString = "0-9";

  if (isDecimal.value) {
    switch (props.decimalSeparator) {
      case ".":
        regExpString += "\\.";
        break;
      case ",":
        regExpString += ",";
        break;
    }
  }

  if (isGrouped.value) {
    switch (props.groupSeparator) {
      case ".":
        regExpString += "\\.";
        break;
      case ",":
        regExpString += ",";
        break;
      case "'":
        regExpString += ";";
        break;
    }
  }

  regExpString = `[${regExpString}]*`;

  if (props.signed) {
    regExpString = "-?" + regExpString;
  }

  return "^" + regExpString + "$";
});

function handleBlur() {
  if (value.value === undefined) {
    return;
  }
  emit("update", value.value);
}

function fromNumberToString(value: string): string {
  if (!value) {
    return "";
  }

  const stringValue = isFixedDecimal.value ? Number(value).toFixed(props.decimalDigits) : Number(value).toString();
  const [rawIntegerPart, rawDecimalPart] = stringValue.split(".");
  let integerPart = "";
  let decimalPart: string | undefined = rawDecimalPart;

  // Format the integer part
  if (isGrouped.value) {
    for (let i = 1; i <= rawIntegerPart.length; i++) {
      integerPart = rawIntegerPart.charAt(rawIntegerPart.length - i) + integerPart;
      if (i % props.groupDigits! === 0 && i !== rawIntegerPart.length) {
        integerPart = props.groupSeparator! + integerPart;
      }
    }
  }
  else {
    integerPart = rawIntegerPart;
  }

  // Format the decimal part
  if (isFixedDecimal.value) {
    if (decimalPart.length > props.decimalDigits!) {
      const powerOfTen = Math.pow(10, decimalPart.length - props.decimalDigits!);
      decimalPart = Math.round(Number(decimalPart) / powerOfTen).toString();
    }

    decimalPart = decimalPart.padEnd(props.decimalDigits!, "0");
  }

  // Clear decimal part if integer part is empty
  if (integerPart === "") {
    decimalPart = "";
  }

  // Write result
  if (!isDecimal.value) {
    return integerPart;
  }
  else {
    return integerPart
      + (decimalPart ? props.decimalSeparator! + decimalPart : "");
  }
}

function fromStringToNumber(value: string): string {
  let result = value;
  if (isGrouped.value) {
    result = result.replaceAll(props.groupSeparator!, "");
  }
  if (isDecimal.value) {
    result = result.replaceAll(props.decimalSeparator!, ".");
  }

  return Number(result).toString();
}

function onInput(ev: Event) {
  const target = ev.target as HTMLInputElement;
  const oldValue = value.value!;
  const newValue = target.value;

  const newCaretPosition = target.selectionStart!;

  const oldDecimalSeparatorIndex = oldValue.indexOf(props.decimalSeparator!);
  const firstNewDecimalSeparatorIndex = newValue.indexOf(props.decimalSeparator!);
  const secondNewDecimalSeparatorIndex = newValue.lastIndexOf(props.decimalSeparator!);

  let rawValue = newValue;
  let rawIntegerPart: string = "";
  let integerPart: string = "";
  let decimalPart: string | undefined = undefined;
  let removedLeadingZeros = 0;

  if (!newValue.match(new RegExp(pattern.value))) {
    target.value = oldValue;
    return;
  }

  // Deal with decimal separator editing:
  if (isDecimal.value) {
    if (firstNewDecimalSeparatorIndex !== secondNewDecimalSeparatorIndex) {
      target.value = oldValue;
      if (firstNewDecimalSeparatorIndex + 1 === secondNewDecimalSeparatorIndex) {
        target.selectionStart = newCaretPosition;
        target.selectionEnd = newCaretPosition;
      }
      return;
    }

    if (oldDecimalSeparatorIndex >= 0 && firstNewDecimalSeparatorIndex < 0) {
      rawValue = rawValue.substring(0, newCaretPosition) + props.decimalSeparator + rawValue.substring(newCaretPosition);
    }
  }

  // Remove group separators
  if (isGrouped.value) {
    rawValue = rawValue.replaceAll(props.groupSeparator!, "");
  }

  // Split integer part and decimal part
  if (isDecimal.value) {
    [rawIntegerPart, decimalPart] = rawValue.split(props.decimalSeparator!);
  }
  else {
    rawIntegerPart = rawValue;
  }

  // Remove leading zeros
  const rawIntegerPartWithoutLeadingZeros = rawIntegerPart.replace(/^0+/g, "");
  removedLeadingZeros = rawIntegerPart.length - rawIntegerPartWithoutLeadingZeros.length;
  if (rawIntegerPartWithoutLeadingZeros === "" && rawIntegerPart !== "") {
    rawIntegerPart = "0";
    removedLeadingZeros -= 1;
  }
  else {
    rawIntegerPart = rawIntegerPartWithoutLeadingZeros;
  }

  // Format the integer part
  if (isGrouped.value) {
    for (let i = 1; i <= rawIntegerPart.length; i++) {
      integerPart = rawIntegerPart.charAt(rawIntegerPart.length - i) + integerPart;
      if (i % props.groupDigits! === 0 && i !== rawIntegerPart.length) {
        integerPart = props.groupSeparator! + integerPart;
      }
    }
  }
  else {
    integerPart = rawIntegerPart;
  }

  // Remove trailing zeros
  if (decimalPart === undefined) {
    decimalPart = "";
  }
  if (isDecimal.value) {
    decimalPart = decimalPart.replace(/0+$/g, "");
  }

  // Format the decimal part
  if (isFixedDecimal.value) {
    if (decimalPart.length > props.decimalDigits!) {
      target.value = oldValue;
      return;
    }

    decimalPart = decimalPart.padEnd(props.decimalDigits!, "0");
  }

  // Clear decimal part if integer part is empty
  if (integerPart === "") {
    decimalPart = "";
  }

  // Write result
  if (!isDecimal.value) {
    value.value = integerPart;
    target.value = integerPart;
  }
  else {
    value.value = integerPart
      + (decimalPart ? props.decimalSeparator! + decimalPart : "");
    target.value = integerPart
      + ((newValue.endsWith(props.decimalSeparator!) || decimalPart) ? props.decimalSeparator : "")
      + (decimalPart ? decimalPart : "");
  }

  // Deal with caret position
  const separatorsBeforeCaretBeforeFormat = newValue.substring(0, newCaretPosition).replaceAll(/[0-9]/g, "").replaceAll(props.decimalSeparator!, "").length;
  const separatorsBeforeCaretAfterFormat = target.value.substring(0, newCaretPosition).replaceAll(/[0-9]/g, "").replaceAll(props.decimalSeparator!, "").length;
  let updatedCaretPosition = newCaretPosition + separatorsBeforeCaretAfterFormat - separatorsBeforeCaretBeforeFormat;
  updatedCaretPosition -= removedLeadingZeros;
  if (target.value.charAt(updatedCaretPosition - 1) === props.groupSeparator!) {
    updatedCaretPosition -= 1;
  }
  target.selectionStart = updatedCaretPosition;
  target.selectionEnd = updatedCaretPosition;
}
</script>

<style lang="scss" scoped>
.d-number-input {
  display: block;

  &__label {
    @include tokens.typography-text-s--bold;
    display: block;
    color: tokens.$color-flavor1;
  }

  &__container {
    @include tokens.round-edged-block;
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  &__input {
    @include tokens.typography-text--medium;
    flex: 1 1;
    height: tokens.$input-size;
    border: none;
    border-bottom: 2px solid tokens.$color-flavor1;
    padding: 0 tokens.$space-s;
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

    &::-ms-reveal,
    &::-ms-clear {
      display: none;
    }
  }

  &__addon {
    @include tokens.typography-text--medium;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    height: tokens.$input-size;
    min-width: tokens.$input-size;
    padding: 0 tokens.$space-s;
    background-color: tokens.$color-flavor1;
    color: white;
    cursor: pointer;
  }

  &__error-message {
    @include tokens.typography-text-s;
    color: tokens.$color-error;
  }
}
</style>
