import BaseUpdater from './BaseUpdater.js';
import ColumnUpdater from './ColumnUpdater.js';

class RowUpdater extends BaseUpdater {
    startUpdate() {
        this.rootRef.on('child_added', this.addRow, this);
        this.rootRef.on('child_removed', this.removeRow, this);
    }

    stopUpdate() {
        this.rootRef.off('child_added', this.addRow, this);
        this.rootRef.off('child_removed', this.removeRow, this);
    }

    addRow(snapshot) {
        var key = snapshot.key,
            value = snapshot.val();
        this.setData(key, value);

        switch (this.type) {
            case 2:
                this.emit(this.eventNames.addkey0, this.key, key, value);
                break;
            default: // 3
                this.emit(this.eventNames.addkey1, this.key, key, value);
                break;
        }
    }

    removeRow(snapshot) {
        var key = snapshot.key;
        this.removeChild(key);

        switch (this.type) {
            case 2:
                this.emit(this.eventNames.removekey0, key);
                break;
            default: // 3
                this.emit(this.eventNames.removekey1, this.key, key);
                break;
        }
    }

    get childClass() {
        return ColumnUpdater;
    }

    get pageKey() {
        return this.parent.key;
    }
}

export default RowUpdater;