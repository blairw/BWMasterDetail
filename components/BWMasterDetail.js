var MOBILE_THRESHOLD = 600;

var pageInitialised = false;
var selectedItem = null;
var pageMode = "DESKTOP";

function bodyDidLoad() {
	attachHandlers();
	switchToDetailBlock("Thing1");

	if (window.innerWidth <= MOBILE_THRESHOLD) {
		pageMode = "MOBILE";

		// User lands on the menu rather than the default-selected item
		$("#BWMasterDetail_Detail").hide();
	}

	pageInitialised = true;
}

function switchToDetailBlock(thisDetailBlock) {
	// Highlighting
	$(".BWMasterDetail_MasterItem").removeClass("is-active");
	$("#" + "BWMasterDetail_MasterItemFor_" + thisDetailBlock).addClass("is-active");

	// Actual moving to the block
	$(".DetailBlock").hide();
	$("#" + thisDetailBlock).show();

	// Update title
	$("#CurrentItemHeading").html(thisDetailBlock)

	// Record the change
	selectedItem = thisDetailBlock;
}

function respondToWindowResize() {
	if (window.innerWidth <= MOBILE_THRESHOLD && pageMode == "DESKTOP") {
		// Moving from Desktop to Mobile
		pageMode = "MOBILE";

		// No further action required
	}

	if (window.innerWidth > MOBILE_THRESHOLD && pageMode == "MOBILE") {
		// Moving from Mobile to Desktop
		pageMode = "DESKTOP";

		$("#BWMasterDetail_Master").show();
		$("#BWMasterDetail_Detail").show();
	}
}

function attachHandlers() {
	$(".BWMasterDetail_MasterItem").on("click", function () {
		var thisId = $(this).attr('id');
		var thisDetailBlock = thisId.replace("BWMasterDetail_MasterItemFor_", "");
		switchToDetailBlock(thisDetailBlock);

		if (pageInitialised && window.innerWidth <= MOBILE_THRESHOLD) {
			$("#BWMasterDetail_Detail").show("slide", { direction: "right" }, 500);
			$("#BWMasterDetail_Master").hide("slide", { direction: "left" }, 700);
		}
	});

	$("#BackButton").on("click", function () {
		if (window.innerWidth <= MOBILE_THRESHOLD) {
			$("#BWMasterDetail_Detail").hide("slide", { direction: "right" }, 700);
			$("#BWMasterDetail_Master").show("slide", { direction: "left" }, 500);
		}
	})

	// Adapted from https://stackoverflow.com/questions/599288/cross-browser-window-resize-event-javascript-jquery
	let resizeTimer = 0;
	$(window).on("resize", function () {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(respondToWindowResize(), 100);
	});
}