use std::cell::RefCell;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct SceneState {
    pub grid_visible: bool,
    pub axes_visible: bool,
}

impl Default for SceneState {
    fn default() -> Self {
        SceneState {
            grid_visible: true,
            axes_visible: true,
        }
    }
}

thread_local! {
    static SCENE_STATE: RefCell<SceneState> = RefCell::new(SceneState::default());
}

#[wasm_bindgen]
pub fn set_grid_visible(grid_visible: bool) {
    SCENE_STATE.with_borrow_mut(|state| state.grid_visible = grid_visible)
}

#[wasm_bindgen]
pub fn set_axes_visible(axes_visible: bool) {
    SCENE_STATE.with_borrow_mut(|state| state.axes_visible = axes_visible)
}

#[wasm_bindgen]
pub fn get_grid_visible() -> bool {
    SCENE_STATE.with_borrow(|state| state.grid_visible)
}

#[wasm_bindgen]
pub fn get_axes_visible() -> bool {
    SCENE_STATE.with_borrow(|state| state.axes_visible)
}
