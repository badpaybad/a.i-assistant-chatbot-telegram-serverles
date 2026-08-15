# Makefile for GRBL v1.1h (cncapi build)
# Uses avr-gcc toolchain from Arduino IDE package

AVR_BIN_DIR ?= /home/dunp/.arduino15/packages/arduino/tools/avr-gcc/7.3.0-atmel3.6.1-arduino7/bin
CC = $(AVR_BIN_DIR)/avr-gcc
OBJCOPY = $(AVR_BIN_DIR)/avr-objcopy
SIZE = $(AVR_BIN_DIR)/avr-size

DEVICE     ?= atmega328p
CLOCK      = 16000000
SOURCE     = main.c motion_control.c gcode.c spindle_control.c coolant_control.c serial.c \
             protocol.c stepper.c eeprom.c settings.c planner.c nuts_bolts.c limits.c jog.c \
             print.c probe.c report.c system.c device_id.c
BUILDDIR   = build

COMPILE = $(CC) -Wall -Os -DF_CPU=$(CLOCK) -mmcu=$(DEVICE) -I. -ffunction-sections -flto

OBJECTS = $(addprefix $(BUILDDIR)/,$(notdir $(SOURCE:.c=.o)))

all: grbl.hex

$(BUILDDIR):
	mkdir -p $(BUILDDIR)

$(BUILDDIR)/%.o: %.c | $(BUILDDIR)
	$(COMPILE) -MMD -MP -c $< -o $@

clean:
	rm -rf $(BUILDDIR) grbl.hex

$(BUILDDIR)/main.elf: $(OBJECTS)
	$(COMPILE) -o $(BUILDDIR)/main.elf $(OBJECTS) -lm -Wl,--gc-sections

grbl.hex: $(BUILDDIR)/main.elf
	rm -f grbl.hex
	$(OBJCOPY) -j .text -j .data -O ihex $(BUILDDIR)/main.elf grbl.hex
	$(SIZE) --format=berkeley $(BUILDDIR)/main.elf

.PHONY: all clean
