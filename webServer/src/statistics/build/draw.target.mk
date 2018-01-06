# This file is generated by gyp; do not edit.

TOOLSET := target
TARGET := draw
DEFS_Debug := \
	'-DNODE_GYP_MODULE_NAME=draw' \
	'-DUSING_UV_SHARED=1' \
	'-DUSING_V8_SHARED=1' \
	'-DV8_DEPRECATION_WARNINGS=1' \
	'-D_LARGEFILE_SOURCE' \
	'-D_FILE_OFFSET_BITS=64' \
	'-DBUILDING_NODE_EXTENSION' \
	'-DDEBUG' \
	'-D_DEBUG' \
	'-DV8_ENABLE_CHECKS'

# Flags passed to all source files.
CFLAGS_Debug := \
	-fPIC \
	-pthread \
	-Wall \
	-Wextra \
	-Wno-unused-parameter \
	-m64 \
	-g \
	-O0

# Flags passed to only C files.
CFLAGS_C_Debug :=

# Flags passed to only C++ files.
CFLAGS_CC_Debug := \
	-fno-rtti \
	-fno-exceptions \
	-std=gnu++0x

INCS_Debug := \
	-I/home/yv/.node-gyp/8.6.0/include/node \
	-I/home/yv/.node-gyp/8.6.0/src \
	-I/home/yv/.node-gyp/8.6.0/deps/uv/include \
	-I/home/yv/.node-gyp/8.6.0/deps/v8/include \
	-I$(srcdir)/-I/usr/include/python2.7 -I/usr/include/x86_64-linux-gnu/python2.7

DEFS_Release := \
	'-DNODE_GYP_MODULE_NAME=draw' \
	'-DUSING_UV_SHARED=1' \
	'-DUSING_V8_SHARED=1' \
	'-DV8_DEPRECATION_WARNINGS=1' \
	'-D_LARGEFILE_SOURCE' \
	'-D_FILE_OFFSET_BITS=64' \
	'-DBUILDING_NODE_EXTENSION'

# Flags passed to all source files.
CFLAGS_Release := \
	-fPIC \
	-pthread \
	-Wall \
	-Wextra \
	-Wno-unused-parameter \
	-m64 \
	-O3 \
	-fno-omit-frame-pointer

# Flags passed to only C files.
CFLAGS_C_Release :=

# Flags passed to only C++ files.
CFLAGS_CC_Release := \
	-fno-rtti \
	-fno-exceptions \
	-std=gnu++0x

INCS_Release := \
	-I/home/yv/.node-gyp/8.6.0/include/node \
	-I/home/yv/.node-gyp/8.6.0/src \
	-I/home/yv/.node-gyp/8.6.0/deps/uv/include \
	-I/home/yv/.node-gyp/8.6.0/deps/v8/include \
	-I$(srcdir)/-I/usr/include/python2.7 -I/usr/include/x86_64-linux-gnu/python2.7

OBJS := \
	$(obj).target/$(TARGET)/draw.o \
	$(obj).target/$(TARGET)/draw.o

# Add to the list of files we specially track dependencies for.
all_deps += $(OBJS)

# CFLAGS et al overrides must be target-local.
# See "Target-specific Variable Values" in the GNU Make manual.
$(OBJS): TOOLSET := $(TOOLSET)
$(OBJS): GYP_CFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_C_$(BUILDTYPE))
$(OBJS): GYP_CXXFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_CC_$(BUILDTYPE))

# Suffix rules, putting all outputs into $(obj).

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(srcdir)/%.cc FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(srcdir)/%.cpp FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

# Try building from generated source, too.

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj).$(TOOLSET)/%.cc FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj).$(TOOLSET)/%.cpp FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj)/%.cc FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj)/%.cpp FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

# End of this set of suffix rules
### Rules for final target.
LDFLAGS_Debug := \
	-pthread \
	-rdynamic \
	-m64

LDFLAGS_Release := \
	-pthread \
	-rdynamic \
	-m64

LIBS := \
	-L/usr/lib/python2.7/config-x86_64-linux-gnu -L/usr/lib -lpython2.7

$(obj).target/draw.node: GYP_LDFLAGS := $(LDFLAGS_$(BUILDTYPE))
$(obj).target/draw.node: LIBS := $(LIBS)
$(obj).target/draw.node: TOOLSET := $(TOOLSET)
$(obj).target/draw.node: $(OBJS) FORCE_DO_CMD
	$(call do_cmd,solink_module)

all_deps += $(obj).target/draw.node
# Add target alias
.PHONY: draw
draw: $(builddir)/draw.node

# Copy this to the executable output path.
$(builddir)/draw.node: TOOLSET := $(TOOLSET)
$(builddir)/draw.node: $(obj).target/draw.node FORCE_DO_CMD
	$(call do_cmd,copy)

all_deps += $(builddir)/draw.node
# Short alias for building this executable.
.PHONY: draw.node
draw.node: $(obj).target/draw.node $(builddir)/draw.node

# Add executable to "all" target.
.PHONY: all
all: $(builddir)/draw.node

